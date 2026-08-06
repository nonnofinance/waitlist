import { eq } from "drizzle-orm";

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { waitlistTable } from "@/db/schema";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { joinWaitlistSchema } from "@/lib/waitlist";

export async function POST(request: NextRequest) {
	const json = await request.json().catch(() => null);

	const parsed = joinWaitlistSchema.safeParse(json);

	if (!parsed.success) {
		return NextResponse.json(
			{
				error:
					parsed.error.issues[0]?.message ??
					"Dados inválidos.",
			},
			{
				status: 400,
			},
		);
	}

	const email = parsed.data.email.trim().toLowerCase();
	const { turnstileToken } = parsed.data;

	const secret = process.env.TURNSTILE_SECRET_KEY;

	if (!secret) {
		console.error("TURNSTILE_SECRET_KEY missing");

		return NextResponse.json(
			{
				error: "Configuração indisponível.",
			},
			{
				status: 500,
			},
		);
	}

	const verification = await verifyTurnstileToken(
		turnstileToken,
		secret,
		request.headers.get("cf-connecting-ip") ?? undefined,
	);

	if (!verification.success) {
		return NextResponse.json(
			{
				error: "Falha na verificação do Turnstile.",
			},
			{
				status: 403,
			},
		);
	}

	const existingEmail = await db
		.select({
			id: waitlistTable.id,
		})
		.from(waitlistTable)
		.where(eq(waitlistTable.email, email))
		.limit(1);

	if (existingEmail.length > 0) {
		return NextResponse.json(
			{
				error: "Esse e-mail já está na lista.",
			},
			{
				status: 409,
			},
		);
	}

	try {
		await db.insert(waitlistTable).values({
			email,
		});
	} catch (error) {
		if (isUniqueConstraintError(error)) {
			return NextResponse.json(
				{
					error: "Esse e-mail já está na lista.",
				},
				{
					status: 409,
				},
			);
		}

		console.error("waitlist insert failed:", error);

		return NextResponse.json(
			{
				error: "Erro ao salvar e-mail.",
			},
			{
				status: 500,
			},
		);
	}

	return NextResponse.json(
		{
			success: true,
		},
		{
			status: 201,
		},
	);
}

function isUniqueConstraintError(error: unknown) {
	if (!(error instanceof Error)) return false;

	const postgresError = error as Error & {
		code?: string;
	};

	return postgresError.code === "23505";
}
