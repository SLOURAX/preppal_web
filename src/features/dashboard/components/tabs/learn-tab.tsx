"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  GraduationCap,
  Target,
} from "lucide-react";

import { ExamsTab } from "./exams-tab";
import { SubjectsTab } from "./subjects-tab";

type LearnMode = "exams" | "subjects";

export function LearnTab() {
  const [mode, setMode] = useState<LearnMode>("exams");

  return (
    <section className="space-y-6">
      <div className="from-primary/10 via-primary/5 to-surface relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 sm:p-8">
        <div className="bg-primary/10 pointer-events-none absolute -right-10 -bottom-20 size-56 rounded-full blur-3xl" />
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
          className={`group flex items-center gap-4 rounded-2xl p-4 text-left transition-all ${mode === "exams" ? "bg-primary text-primary-foreground shadow-primary/20 shadow-lg" : "surface-card text-foreground hover:-translate-y-0.5"}`}
          onClick={() => setMode("exams")}
          type="button"
        >
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
          className={`group flex items-center gap-4 rounded-2xl p-4 text-left transition-all ${mode === "subjects" ? "bg-primary text-primary-foreground shadow-primary/20 shadow-lg" : "surface-card text-foreground hover:-translate-y-0.5"}`}
          onClick={() => setMode("subjects")}
          type="button"
        >
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
    </section>
  );
}
