import "@/styles/globals.css";

import type { Metadata } from "next";
import { Nunito_Sans, Public_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/QueryProvider";

const nunitoSansHeading = Nunito_Sans({
	subsets: ["latin"],
	variable: "--font-heading",
});

const publicSans = Public_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Nonno Finance | Educação financeira para famílias",
	description:
		"Uma forma simples de aprender sobre dinheiro em conjunto. Metas, cofrinhos, organização financeira e um assistente de IA para ajudar cada pessoa a construir uma relação melhor com dinheiro.",
	icons: {
		icon: "/favicon.svg",
	},
	openGraph: {
		title: "Nonno Finance",
		description:
			"Aprenda sobre dinheiro de um jeito mais simples, com ferramentas pensadas para diferentes famílias e momentos da vida.",
		type: "website",
		locale: "pt_BR",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={cn(
					publicSans.variable,
					nunitoSansHeading.variable,
					"font-sans antialiased",
				)}
			>
				<QueryProvider>
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
