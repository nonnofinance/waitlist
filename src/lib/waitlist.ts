import { z } from "zod";
import disposableDomains from "disposable-email-domains";

const disposableSet = new Set(disposableDomains);

export const joinWaitlistSchema = z.object({
	email: z
		.string()
		.trim()
		.toLowerCase()
		.email("Digite um e-mail válido.")
		.max(254, "E-mail muito longo.")
		.refine(
			(email) => {
				const domain = email.split("@")[1];

				return domain && !disposableSet.has(domain);
			},
			{
				message:
					"E-mails temporários não são permitidos.",
			},
		),

	turnstileToken: z
		.string()
		.min(1, "Complete a verificação."),
});

export type JoinWaitlistPayload = z.infer<
	typeof joinWaitlistSchema
>;
