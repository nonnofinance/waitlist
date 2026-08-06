"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { WebContainer } from "@/components/layout/WebContainer";

const plans = [
  {
    tag: "1 pessoa",
    title: "Individual",
    description:
      "Suas metas, seus cofrinhos, do seu jeito. Para quem cuida do próprio dinheiro sozinho.",
  },
  {
    tag: "2 pessoas",
    title: "Casal",
    description:
      "Contas e objetivos em comum, do casamento à união livre — do jeito que fizer sentido para vocês.",
  },
  {
    tag: "Até 4 pessoas",
    title: "Família",
    description:
      "Um espaço para toda a casa: um responsável ou dois, com filhos ou sem, cuidando de tudo junto.",
  },
  {
    tag: "Até 8 pessoas",
    title: "Família+",
    description:
      "Famílias grandes, várias gerações, avós e tios incluídos — mais espaço para quem tem mais gente para organizar junto.",
  },
];

const animation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function AboutSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-[#171513] py-20 text-[#F3EBDD]">
      <Button
        onClick={() => router.back()}
        size="icon"
        variant="ghost"
        className="
          fixed
          left-6
          top-6
          z-50
          h-10
          w-10
          rounded-full
          border
          border-[#F3EBDD]/10
          bg-[#F3EBDD]/5
          text-[#F3EBDD]/60
          backdrop-blur-xl
          hover:bg-[#F3EBDD]/10
          hover:text-[#F3EBDD]
        "
      >
        <ArrowLeft size={17} weight="bold" />
      </Button>

      <WebContainer>
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animation}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[0.4em] text-[#F3EBDD]/40">
              NONNO FINANCE
            </p>

            <h1
              className="
                mt-6
                max-w-xl
                text-[34px]
                font-normal
                leading-[1.2]
                tracking-tight
                text-[#F3EBDD]
                md:text-[42px]
              "
            >
              Uma forma mais delicada de cuidar do dinheiro, seja qual for a
              sua família.
            </h1>

            <p className="mt-5 max-w-lg text-[15px] leading-7 text-[#C4B8A6]/80">
              Do primeiro cofrinho aos grandes objetivos, o Nonno ajuda cada
              pessoa a construir uma relação melhor com dinheiro — sozinha ou
              acompanhada.
            </p>
          </motion.div>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animation}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-lg font-medium text-[#F3EBDD]/90">
              O que é o Nonno?
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#C4B8A6]/75">
              O Nonno organiza as finanças de quem você chama de família:
              cada pessoa com suas metas, cofrinhos e objetivos. Quem
              acompanha pode ver essa evolução, enquanto uma inteligência
              artificial ajuda a transformar dinheiro em aprendizado.
            </p>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animation}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-lg font-medium text-[#F3EBDD]/90">
              Nosso objetivo
            </h2>

            <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#C4B8A6]/75">
              <p>
                Educação financeira não deveria depender apenas de aulas,
                planilhas ou teoria.
              </p>

              <p>
                O Nonno acredita que o aprendizado acontece quando a família
                vive essas decisões no dia a dia.
              </p>

              <p>
                Mais do que controlar gastos, queremos ajudar cada pessoa a
                entender sua relação com dinheiro e criar bons hábitos.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animation}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-lg font-medium text-[#F3EBDD]/90">
              Para cada tipo de família
            </h2>

            <p className="mt-4 max-w-lg text-[15px] leading-7 text-[#C4B8A6]/75">
              Família não tem um formato padrão — e o Nonno não tenta definir
              um. Por isso existem quatro planos, pensados para quem organiza
              a vida financeira sozinho, a dois, ou em qualquer configuração
              de família.
            </p>

            <div className="mt-8 divide-y divide-[#F3EBDD]/8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-baseline justify-between gap-6 py-6"
                >
                  <div>
                    <h3 className="text-base font-medium text-[#F3EBDD]">
                      {plan.title}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#C4B8A6]/65">
                      {plan.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs text-[#C7773F]/90">
                    {plan.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animation}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-lg font-medium text-[#F3EBDD]/90">
              Por que Nonno?
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#C4B8A6]/75">
              &ldquo;Nonno&rdquo; significa avô em italiano. Escolhemos esse
              nome pela sensação que ele representa: alguém experiente,
              paciente e sempre disposto a ensinar.
            </p>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animation}
            transition={{ duration: 0.5 }}
            className="
              mt-20
              border-t
              border-[#F3EBDD]/8
              pt-12
            "
          >
            <h2 className="max-w-lg text-2xl font-normal leading-snug text-[#F3EBDD]">
              Uma nova relação com dinheiro começa em pequenas escolhas.
            </h2>

            <p className="mt-3 text-sm text-[#C4B8A6]/55">
              O Nonno está chegando. Entre agora mesmo na lista de espera, que
              está na página anterior.
            </p>
          </motion.section>
        </div>
      </WebContainer>
    </section>
  );
}