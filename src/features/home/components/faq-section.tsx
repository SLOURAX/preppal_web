"use client";

import { SaxArrowDown1Bulk } from "@meysam213/iconsax-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

const FAQS: readonly FaqItem[] = [
  {
    question: "How does the AI quiz generation work?",
    answer:
      "Preppal's AI analyses your selected subject and difficulty level, then generates fresh, unique questions every session. After each answer you get an instant AI-written explanation so you understand exactly where you went right or wrong.",
  },
  {
    question: "Are the prizes and rewards real?",
    answer:
      "Yes — every coin you earn is redeemable for real-world rewards including Amazon and Google Play gift cards, Apple Store credit, and Preppal Premium subscriptions. Rewards are credited within 24 hours of redemption.",
  },
  {
    question: "Is Preppal free to use?",
    answer:
      "Our core features — daily quizzes, leaderboards, streaks, and coin earning — are completely free. Preppal Premium unlocks unlimited mock exams, advanced AI analytics, and exclusive prize tiers.",
  },
  {
    question: "How do daily streaks work?",
    answer:
      "Log in and complete at least one quiz per day to keep your streak alive. Streaks give you coin multipliers: a 7-day streak earns 1.5×, a 14-day streak earns 2×, and a 30-day streak earns 3× coins on every correct answer.",
  },
  {
    question: "Which exams and subjects does Preppal cover?",
    answer:
      "Preppal covers a wide range of subjects including Biology, Chemistry, Physics, Mathematics, English, Computer Science, Economics, and General Knowledge. Exam-focused tracks for WAEC, JAMB, SAT, and more are actively being added.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="flex flex-col items-center">
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-foreground mt-4 text-3xl font-bold tracking-[-0.035em]">
          Frequently asked questions
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          Everything you need to know about Preppal. Can&apos;t find what
          you&apos;re looking for?{" "}
          <a
            href="mailto:hello@preppal.app"
            className="text-primary font-semibold hover:underline"
          >
            Drop us a message.
          </a>
        </p>
      </div>

      <dl className="mt-7 w-full max-w-2xl space-y-2">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={cn(
                "surface-card overflow-hidden rounded-xl transition-shadow duration-200",
                isOpen && "shadow-sm",
              )}
            >
              <dt>
                <button
                  aria-controls={`faq-body-${index}`}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left focus-visible:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                >
                  <span className="text-foreground text-sm leading-snug font-semibold">
                    {faq.question}
                  </span>
                  <SaxArrowDown1Bulk
                    aria-hidden="true"
                    className={cn(
                      "text-muted-foreground size-4 shrink-0 transition-transform duration-200",
                      isOpen && "text-primary rotate-180",
                    )}
                  />
                </button>
              </dt>
              <dd
                id={`faq-body-${index}`}
                className={cn(
                  "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                  isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <p className="text-muted-foreground border-border border-t px-5 py-4 text-sm leading-6">
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
