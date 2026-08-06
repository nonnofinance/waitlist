"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";

import { EmailForm } from "@/components/EmailForm";
import { WebContainer } from "@/components/layout/WebContainer";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="hidden object-cover object-center brightness-[0.55] saturate-75 md:block"
      />

      <Image
        src="/hero-mobile.png"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center brightness-[0.55] saturate-75 md:hidden"
      />

      <div className="absolute inset-0 bg-black/30 md:bg-linear-to-r md:from-black/75 md:via-black/45 md:to-black/20" />

      <WebContainer className="relative z-10 flex min-h-screen items-center py-20">
        <div className="grid w-full items-center gap-10 md:grid-cols-[1fr_320px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="max-w-md"
          >
            <p className="mb-6 text-[11px] tracking-[0.4em] text-white/55">
              NONNO FINANCE
            </p>

            <h1 className="text-[32px] font-normal leading-[1.15] tracking-tight text-white sm:text-[38px] lg:text-[44px]">
              Sua família organizando o dinheiro, junto.
            </h1>

            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/65">
              Cofrinhos, mesada com bônus e um assistente de IA que ajuda a
              família a entender pra onde o dinheiro vai.
            </p>

            <EmailForm />

            <Link
              href="/sobre"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-[#E5A56E]"
            >
              Conheça o Nonno e como funciona
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="hidden md:block"
          >
            <p className="max-w-xs text-base font-light leading-relaxed text-white/60">
              Pequenas escolhas hoje. Grandes histórias amanhã.
            </p>
          </motion.div>
        </div>
      </WebContainer>
    </section>
  );
}
