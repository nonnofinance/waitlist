"use client";

import { useMutation } from "@tanstack/react-query";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useRef, useState, type FormEvent } from "react";

import { ApiError } from "@/lib/error";

import {
	joinWaitlistSchema,
	type JoinWaitlistPayload,
} from "@/lib/waitlist";

import {
	TurnstileWidget,
	type TurnstileHandle,
} from "@/components/TurnstileWidget";


async function joinWaitlist(payload: JoinWaitlistPayload) {
	const res = await fetch("/api/waitlist", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const data = (await res.json().catch(() => ({}))) as {
		error?: string;
	};

	if (!res.ok) {
		throw new ApiError(
			data.error ?? "Não foi possível entrar na lista.",
			res.status,
		);
	}

	return data;
}


export function EmailForm() {
	const [email, setEmail] = useState("");
	const [turnstileToken, setTurnstileToken] = useState("");
	const [validationError, setValidationError] = useState("");

	const turnstileRef = useRef<TurnstileHandle>(null);


	const mutation = useMutation({
		mutationFn: joinWaitlist,

		onSettled: () => {
			setTurnstileToken("");
			turnstileRef.current?.reset();
		},
	});


	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		if (mutation.isPending) return;


		const result = joinWaitlistSchema.safeParse({
			email: email.trim().toLowerCase(),
			turnstileToken,
		});


		if (!result.success) {
			setValidationError(
				result.error.issues[0]?.message ??
					"Dados inválidos.",
			);

			return;
		}


		setValidationError("");

		mutation.mutate(result.data);
	}


	if (mutation.isSuccess) {
		return (
			<div className="mt-7 flex max-w-sm items-center gap-2 text-sm text-[#F3EBDD]/80">
				<CheckCircle
					size={18}
					weight="fill"
					className="text-[#C7773F]"
				/>

				Você entrou na lista. Avisamos assim que abrirmos.
			</div>
		);
	}


	return (
		<form
			onSubmit={handleSubmit}
			className="mt-7 max-w-sm"
		>
			<div
				className="
					flex
					h-12
					items-center
					gap-2

					rounded-full

					border
					border-[#F3EBDD]/15

					bg-[#F3EBDD]/6

					px-1.5

					backdrop-blur-md

					transition-colors

					focus-within:border-[#F3EBDD]/30
					focus-within:bg-[#F3EBDD]/9
				"
			>
				<input
					type="email"
					autoComplete="email"
					placeholder="Seu melhor e-mail"
					required
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
						setValidationError("");
					}}
					className="
						h-full
						flex-1

						bg-transparent

						px-3

						text-[13px]
						text-[#F3EBDD]

						placeholder:text-[#F3EBDD]/35

						outline-none

						focus:bg-transparent

						selection:bg-[#C7773F]/30
						selection:text-[#F3EBDD]

						[-webkit-text-fill-color:#F3EBDD]

						[&:-webkit-autofill]:bg-transparent
						[&:-webkit-autofill]:shadow-none
						[&:-webkit-autofill]:[-webkit-text-fill-color:#F3EBDD]
					"
				/>


				<button
					type="submit"
					aria-label="Entrar na lista de espera"
					disabled={
						!turnstileToken ||
						mutation.isPending
					}
					className="
						flex
						size-8
						items-center
						justify-center

						rounded-full

						bg-[#C7773F]

						text-[#171513]

						transition-colors

						hover:bg-[#D68952]

						disabled:opacity-40
					"
				>
					<ArrowRight
						size={13}
						weight="bold"
					/>
				</button>
			</div>


			<TurnstileWidget
				ref={turnstileRef}
				onVerify={setTurnstileToken}
				onExpire={() => setTurnstileToken("")}
				className="mt-3"
			/>


			{validationError || mutation.isError ? (
				<p className="mt-2 text-[11px] leading-relaxed text-[#E5A56E]">
					{validationError ||
						(mutation.error instanceof Error
							? mutation.error.message
							: "Algo deu errado. Tente de novo.")}
				</p>
			) : (
				<p className="mt-3 text-[11px] leading-relaxed text-[#F3EBDD]/35">
					Sem spam. Avisamos assim que abrirmos as primeiras vagas.
				</p>
			)}
		</form>
	);
}
