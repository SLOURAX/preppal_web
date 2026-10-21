"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { ChevronDown, Mail } from "lucide-react";

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

const FAQS: readonly FaqItem[] = [
  {
    question: "Which exams, subjects, and questions can I practise?",
    answer:
      "Preppal only shows exams and subjects that currently have published questions. Choose an exam, subject, and year for exam practice, or choose a standalone subject, class, and one or more topics. You can then start either an untimed practice session or a timed quiz.",
  },
  {
    question: "What can I ask Preppal AI, and are there usage limits?",
    answer:
      "During supported quizzes, Ask Preppal AI can explain the current question, respond to your follow-up, and help you understand the reasoning without replacing your learning. AI allowances depend on your plan and reset daily. Preppal will notify you clearly whenever you reach your limit.",
  },
  {
    question: "What is included in Free, Monthly, and Annual plans?",
    answer:
      "Free includes a daily quiz allowance, essential progress tracking, and limited AI explanations. Monthly and Annual unlock unlimited practice quizzes, larger quizzes, more daily AI help, advanced analytics, ad-free learning, personalised recommendations, and eligible quiz XP bonuses. The pricing page always shows the current limits and benefits before you subscribe.",
  },
  {
    question:
      "What is the difference between XP, Preppal Coins, and deposited funds?",
    answer:
      "XP is earned from eligible learning and reward activities. Eligible XP can be converted into Preppal Coins at the rate shown in your Wallet, and Coins can be redeemed or withdrawn when your account meets the applicable requirements. Deposited funds are separate spend-only money: they can pay for plans and marketplace items but cannot be withdrawn as cash.",
  },
  {
    question:
      "How can I pay for a subscription, and does it renew automatically?",
    answer:
      "At checkout, you can use your spend-only deposited balance when it is sufficient or continue through the available external payment option. Monthly and Annual plans are prepaid and do not renew automatically. Your access remains active until its displayed expiry date, and you can renew when you are ready.",
  },
  {
    question: "How do Streak Freezes, Double XP, and simulation credits work?",
    answer:
      "You can buy available power-ups in the Marketplace with spend-only deposited funds. A Streak Freeze is used automatically after an eligible missed check-in to protect your streak. A Double XP booster increases progress XP on eligible activities for its active period, but booster bonus XP is not convertible into Coins. Simulation credits unlock supported paid exam simulations and are consumed when a simulation is reserved or used.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="grid gap-10 py-4 lg:grid-cols-[minmax(0,0.83fr)_minmax(0,1.34fr)] lg:gap-16 lg:py-8">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="text-foreground mt-4 max-w-sm text-3xl leading-[1.08] font-black tracking-[-0.045em] sm:text-4xl">
          Quick answers for your Preppal journey
        </h2>
        <p className="text-muted-foreground mt-6 max-w-sm text-xs leading-5 sm:text-sm sm:leading-6">
          Can&apos;t find what you&apos;re looking for? Write to us and
          we&apos;ll point you in the right direction.
        </p>
        <a
          className="text-primary mt-4 inline-flex items-center gap-2 text-xs font-bold hover:underline sm:text-sm"
          href="mailto:hello@preppal.app"
        >
          <Mail className="size-4" />
          hello@preppal.app
        </a>
      </div>

      <dl className="border-border border-t">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div className="border-border border-b" key={faq.question}>
              <dt>
                <button
                  aria-controls={`faq-body-${index}`}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-4 text-left focus-visible:outline-none sm:py-5"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                >
                  <span className="text-foreground group-hover:text-primary text-sm leading-snug font-bold transition-colors sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "border-border text-muted-foreground grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-200",
                      isOpen &&
                        "border-primary/20 bg-primary/8 text-primary rotate-180",
                    )}
                  >
                    <ChevronDown aria-hidden="true" className="size-4" />
                  </span>
                </button>
              </dt>
              <dd
                id={`faq-body-${index}`}
                className={cn(
                  "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                  isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <p className="text-muted-foreground max-w-3xl pr-12 pb-5 text-xs leading-6 sm:text-sm">
                  {faq.answer}
                </p>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
