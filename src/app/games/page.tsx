"use client";

import { useState } from "react";
import {
  SaxAwardBulk,
  SaxChartSuccessBulk,
  SaxFlash1Bulk,
  SaxGameBulk,
  SaxHome2Bulk,
  SaxLock1Bulk,
  SaxMathBulk,
  SaxMedalStarBulk,
  SaxRefresh2Bulk,
  SaxTimer1Bulk,
  SaxTickCircleBulk,
  SaxWallet3Bulk,
  SaxCoin1Bulk,
} from "@meysam213/iconsax-react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  {
    prompt: "What is 12 × 8?",
    options: ["86", "96", "108", "112"],
    answer: "96",
    note: "12 groups of 8 make 96.",
  },
  {
    prompt: "What is 144 ÷ 12?",
    options: ["10", "11", "12", "14"],
    answer: "12",
    note: "12 × 12 = 144.",
  },
  {
    prompt: "What is 15% of 200?",
    options: ["15", "20", "30", "35"],
    answer: "30",
    note: "10% is 20 and 5% is 10, giving 30.",
  },
  {
    prompt: "What is 7² + 3?",
    options: ["46", "49", "52", "56"],
    answer: "52",
    note: "7² is 49, then add 3.",
  },
  {
    prompt: "Which number is prime?",
    options: ["21", "27", "31", "39"],
    answer: "31",
    note: "31 has no factors other than 1 and itself.",
  },
] as const;

const COMING_SOON = [
  {
    title: "Word Blitz",
    detail: "Build vocabulary under pressure.",
    icon: SaxChartSuccessBulk,
  },
  {
    title: "Memory Match",
    detail: "Train recall with exam facts.",
    icon: SaxMedalStarBulk,
  },
] as const;

export default function GamesPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const question = QUESTIONS[questionIndex]!;
  const finished = questionIndex === QUESTIONS.length - 1 && selected !== null;

  const startGame = (): void => {
    setStarted(true);
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
  };

  const chooseAnswer = (option: string): void => {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) {
      setScore((value) => value + 10);
      setStreak((value) => value + 1);
    } else setStreak(0);
  };

  const nextQuestion = (): void => {
    if (finished) return;
    setQuestionIndex((value) => value + 1);
    setSelected(null);
  };

  return (
    <main className="bg-background min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <header className="to-primary shadow-primary/20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#24145f] via-[#4023ad] p-6 text-white shadow-xl sm:p-10">
          <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
          <div className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold tracking-wide">
              <SaxGameBulk className="size-4" /> PLAY, LEARN, LEVEL UP
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Make every minute a power-up.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
              Take a quick break with focused games that sharpen your exam
              skills and reward your momentum.
            </p>
          </div>
          <div className="relative mt-7 flex flex-wrap gap-3 text-xs font-semibold text-white/85">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
              <SaxFlash1Bulk className="size-4 text-amber-300" /> Earn XP as you
              play
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
              <SaxTimer1Bulk className="size-4 text-cyan-200" /> 2-minute rounds
            </span>
          </div>
          <div className="relative mt-6 flex w-full max-w-xs items-center gap-3 rounded-2xl border border-white/15 bg-[#21194d]/70 px-4 py-3 backdrop-blur-sm sm:absolute sm:right-8 sm:bottom-8 sm:mt-0 sm:w-auto">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-violet-200">
              <SaxWallet3Bulk className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-wide text-white/60 uppercase">
                Game wallet
              </p>
              <div className="mt-0.5 flex items-center gap-3 text-sm font-bold">
                <span>1,240 XP</span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1">
                  <SaxCoin1Bulk className="size-3.5 text-amber-300" /> 200
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="surface-card mt-6 overflow-hidden p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-2xl">
                <SaxMathBulk className="size-5" />
              </span>
              <div>
                <p className="text-primary text-[10px] font-bold tracking-[0.18em] uppercase">
                  Featured game
                </p>
                <div className="blur-sm select-none" aria-hidden="true">
                  <h2 className="text-foreground mt-1 text-xl font-bold">
                    Quick Math Sprint
                  </h2>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Five bite-sized questions. Instant feedback. Big brain
                    energy.
                  </p>
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-600">
              <SaxAwardBulk className="size-3.5" /> +10 XP / answer
            </span>
          </div>

          {!started ? (
            <div className="from-primary/10 to-surface-subtle mt-6 flex flex-col items-center justify-between gap-5 rounded-2xl bg-gradient-to-r p-5 sm:flex-row sm:p-6">
              <div className="blur-sm select-none" aria-hidden="true">
                <p className="text-foreground text-sm font-semibold">
                  Ready for a warm-up?
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  No pressure—just a fast way to keep your streak alive.
                </p>
              </div>
              <button
                className="bg-surface-subtle text-muted-foreground inline-flex min-h-10 cursor-not-allowed items-center gap-2 rounded-full px-6 text-sm font-bold"
                disabled
                type="button"
              >
                <SaxLock1Bulk className="size-4" /> Coming soon
              </button>
            </div>
          ) : finished ? (
            <div className="bg-primary/5 mt-6 rounded-2xl p-5 sm:p-7">
              <div className="text-center">
                <SaxMedalStarBulk className="text-primary mx-auto size-10" />
                <h3 className="text-foreground mt-3 text-xl font-bold">
                  Challenge complete!
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Great work — your quick math round is wrapped.
                </p>
              </div>
              <div className="bg-surface mt-5 grid grid-cols-3 divide-x rounded-2xl p-4 text-center">
                <div>
                  <p className="text-foreground text-xl font-black">
                    {score / 10}/{QUESTIONS.length}
                  </p>
                  <p className="text-muted-foreground mt-1 text-[10px] uppercase">
                    Score
                  </p>
                </div>
                <div>
                  <p className="text-xl font-black text-emerald-600">
                    {score} XP
                  </p>
                  <p className="text-muted-foreground mt-1 text-[10px] uppercase">
                    XP earned
                  </p>
                </div>
                <div>
                  <p className="text-primary text-xl font-black">{streak}</p>
                  <p className="text-muted-foreground mt-1 text-[10px] uppercase">
                    Best streak
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <button
                  className="border-primary text-primary inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold"
                  onClick={startGame}
                  type="button"
                >
                  <SaxRefresh2Bulk className="size-4" /> Practice again
                </button>
                <button
                  className="bg-primary text-primary-foreground inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold"
                  onClick={() => router.push("/dashboard")}
                  type="button"
                >
                  <SaxHome2Bulk className="size-4" /> Back to dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">
                  Question {questionIndex + 1} of {QUESTIONS.length}
                </span>
                <span className="text-primary inline-flex items-center gap-1.5">
                  <SaxFlash1Bulk className="size-3.5" /> {score} XP · {streak}{" "}
                  streak
                </span>
              </div>
              <div className="bg-surface-subtle h-1.5 overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{
                    width: `${((questionIndex + (selected ? 1 : 0)) / QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
              <div className="bg-surface-subtle/70 mt-6 rounded-2xl p-5 sm:p-7">
                <p className="text-foreground text-lg font-bold sm:text-xl">
                  {question.prompt}
                </p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => {
                    const isSelected = selected === option;
                    const isAnswer = option === question.answer;
                    return (
                      <button
                        key={option}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${isAnswer && selected ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" : isSelected ? "border-rose-500 bg-rose-500/10 text-rose-700" : "border-border bg-surface hover:border-primary/50"}`}
                        disabled={Boolean(selected)}
                        onClick={() => chooseAnswer(option)}
                        type="button"
                      >
                        <span>{option}</span>
                        {isAnswer && selected ? (
                          <SaxTickCircleBulk className="size-5" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
                {selected ? (
                  <div
                    className={`mt-4 rounded-xl px-4 py-3 text-xs font-semibold ${selected === question.answer ? "bg-emerald-500/10 text-emerald-700" : "bg-rose-500/10 text-rose-700"}`}
                  >
                    {selected === question.answer
                      ? `Correct! ${question.note}`
                      : `Not quite. The answer is ${question.answer}. ${question.note}`}
                  </div>
                ) : null}
                <button
                  className="bg-primary text-primary-foreground mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full text-sm font-bold"
                  disabled={!selected}
                  onClick={nextQuestion}
                  type="button"
                >
                  {finished ? "Finish sprint" : "Next question"}
                  <SaxRefresh2Bulk className="size-4" />
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-primary text-[10px] font-bold tracking-[0.18em] uppercase">
                More ways to play
              </p>
              <h2 className="text-foreground mt-1 text-xl font-bold">
                Coming soon
              </h2>
            </div>
            <SaxLock1Bulk className="text-muted-foreground size-5" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {COMING_SOON.map(({ title, detail, icon: Icon }) => (
              <article
                className="surface-card flex items-center gap-4 p-5 opacity-80"
                key={title}
              >
                <span className="bg-surface-subtle text-muted-foreground grid size-11 place-items-center rounded-2xl">
                  <Icon className="size-5" />
                </span>
                <div>
                  <div className="blur-sm select-none" aria-hidden="true">
                    <h3 className="text-foreground text-sm font-semibold">
                      {title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {detail}
                    </p>
                  </div>
                  <span className="text-muted-foreground mt-2 inline-block text-[10px] font-bold tracking-wide uppercase">
                    Coming soon
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
