"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  GraduationCap,
  Lightbulb,
  RotateCw,
  Target,
} from "lucide-react";
import { SaxLampOnBulk } from "@meysam213/iconsax-react";

import { ExamsTab } from "./exams-tab";
import { SubjectsTab } from "./subjects-tab";

type LearnMode = "exams" | "subjects";

const DAILY_FLASHCARDS = [
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars — its iron-rich surface gives it a reddish appearance.",
    category: "Science",
  },
  {
    question: "What is the largest ocean on Earth?",
    answer: "The Pacific Ocean, covering more than 30% of Earth’s surface.",
    category: "Geography",
  },
  {
    question: "Who wrote the play Romeo and Juliet?",
    answer: "William Shakespeare, who wrote it in the late 16th century.",
    category: "Literature",
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: "Au — from the Latin word aurum, meaning shining dawn.",
    category: "Chemistry",
  },
  {
    question: "How many continents are there?",
    answer:
      "Seven: Africa, Antarctica, Asia, Europe, North America, South America, and Australia.",
    category: "General knowledge",
  },
] as const;

function DailyFlashcard() {
  const [cardIndex, setCardIndex] = useState(
    () => Math.floor(Date.now() / 86_400_000) % DAILY_FLASHCARDS.length,
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const card = DAILY_FLASHCARDS[cardIndex];

  const showNextCard = () => {
    setIsFlipped(false);
    setCardIndex((current) => (current + 1) % DAILY_FLASHCARDS.length);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#17113d] p-5 text-white shadow-[0_18px_45px_rgba(67,45,185,0.18)] sm:p-7">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.25)_0_1px,transparent_1px),radial-gradient(circle_at_80%_70%,rgba(167,139,250,0.35)_0_1px,transparent_1px)] [background-size:24px_24px,34px_34px] opacity-40" />
      <div className="bg-primary/35 pointer-events-none absolute -top-24 -right-12 size-64 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-fuchsia-400/15 blur-3xl" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
        <div className="max-w-xs shrink-0">
          <div className="flex items-center gap-2 text-violet-200">
            <span className="grid size-8 place-items-center rounded-xl bg-white/10">
              <SaxLampOnBulk className="size-4" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase">
              Daily discovery
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
            General knowledge flashcard
          </h2>
          <p className="mt-2 text-xs leading-5 text-violet-200/80">
            One quick fact a day to keep your curiosity in motion.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-violet-100">
            <Lightbulb className="size-3.5 text-amber-300" /> Changes daily
          </div>
        </div>

        <div className="min-w-0 flex-1 [perspective:1200px]">
          <button
            aria-label={
              isFlipped ? "Hide flashcard answer" : "Reveal flashcard answer"
            }
            className="group relative h-56 w-full text-left sm:h-52"
            onClick={() => setIsFlipped((flipped) => !flipped)}
            type="button"
          >
            <div
              className="relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d]"
              style={{
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.1] p-5 shadow-2xl [backface-visibility:hidden]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-violet-300/15 px-2.5 py-1 text-[10px] font-bold tracking-wider text-violet-100 uppercase">
                    {card.category}
                  </span>
                  <RotateCw className="size-4 text-violet-200/70 transition-transform duration-500 group-hover:rotate-45" />
                </div>
                <p className="max-w-xl text-lg leading-7 font-bold sm:text-xl">
                  {card.question}
                </p>
                <span className="text-xs font-semibold text-violet-200/80">
                  Tap to view answer
                </span>
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-400/20 to-violet-400/20 p-5 shadow-2xl [backface-visibility:hidden]"
                style={{ transform: "rotateY(180deg)" }}
              >
                <span className="text-[10px] font-bold tracking-wider text-emerald-200 uppercase">
                  The answer
                </span>
                <p className="text-sm leading-6 font-semibold text-white sm:text-base">
                  {card.answer}
                </p>
                <span className="text-xs font-semibold text-emerald-100/80">
                  Tap to see the question
                </span>
              </div>
            </div>
          </button>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-[11px] text-violet-200/70">
              {cardIndex + 1} of {DAILY_FLASHCARDS.length} discoveries
            </span>
            <button
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-white/15"
              onClick={showNextCard}
              type="button"
            >
              Another fact <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LearnTab() {
  const [mode, setMode] = useState<LearnMode>("exams");

  return (
    <section className="space-y-6">
      <div className="from-primary/10 via-primary/5 to-surface relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(135deg,transparent_24%,color-mix(in_srgb,var(--primary)_6%,transparent)_25%,transparent_26%)] [background-size:28px_28px] opacity-50" />
        <div className="bg-primary/10 pointer-events-none absolute -right-10 -bottom-20 size-56 rounded-full blur-3xl" />
        <GraduationCap className="text-primary/10 pointer-events-none absolute -right-5 -bottom-8 size-48 rotate-12" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-foreground mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              What would you like to practise?
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
              Follow an exam syllabus or focus on a subject. Every session is
              tailored to help you improve with confidence.
            </p>
          </div>
          <div className="bg-surface/80 flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-sm">
            <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-xl">
              <Target className="size-4" />
            </span>
            <div>
              <p className="text-foreground text-sm font-bold">7 day streak</p>
              <p className="text-muted-foreground text-[11px]">Keep it going</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl p-4 text-left transition-all ${mode === "exams" ? "bg-primary text-primary-foreground shadow-primary/20 shadow-lg" : "surface-card text-foreground hover:-translate-y-0.5"}`}
          onClick={() => setMode("exams")}
          type="button"
        >
          <GraduationCap className="pointer-events-none absolute -right-3 -bottom-5 size-24 opacity-10" />
          <span
            className={`grid size-11 shrink-0 place-items-center rounded-xl ${mode === "exams" ? "bg-white/15" : "bg-primary/10 text-primary"}`}
          >
            <GraduationCap className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-bold">Practice an exam</span>
            <span
              className={`mt-1 block text-xs ${mode === "exams" ? "text-primary-foreground/75" : "text-muted-foreground"}`}
            >
              JAMB, WAEC, NECO and more
            </span>
          </span>
          <ArrowUpRight className="size-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
        <button
          className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl p-4 text-left transition-all ${mode === "subjects" ? "bg-primary text-primary-foreground shadow-primary/20 shadow-lg" : "surface-card text-foreground hover:-translate-y-0.5"}`}
          onClick={() => setMode("subjects")}
          type="button"
        >
          <BookOpenCheck className="pointer-events-none absolute -right-3 -bottom-5 size-24 opacity-10" />
          <span
            className={`grid size-11 shrink-0 place-items-center rounded-xl ${mode === "subjects" ? "bg-white/15" : "bg-primary/10 text-primary"}`}
          >
            <BookOpenCheck className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-bold">Practise a subject</span>
            <span
              className={`mt-1 block text-xs ${mode === "subjects" ? "text-primary-foreground/75" : "text-muted-foreground"}`}
            >
              Focus on the topics you choose
            </span>
          </span>
          <ArrowUpRight className="size-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
      {mode === "exams" ? <ExamsTab /> : <SubjectsTab />}
      <DailyFlashcard />
    </section>
  );
}
