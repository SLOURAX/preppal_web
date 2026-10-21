export type QuizPath = "exam" | "subject";
export type QuizSetupStep =
  | "entry"
  | "exam-subject"
  | "exam-year"
  | "subject-class"
  | "subject-topics"
  | "quiz-mode";
export type QuizMode = "timed" | "untimed";

export interface QuizChoice {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}

export const QUIZ_MODES = [
  {
    value: "untimed",
    label: "Practice Playground",
    description:
      "Learn at your own pace. Ask for AI explanations and explore topics deeply.",
    icon: "BoomBox",
  },
  {
    value: "timed",
    label: "Timed Quiz",
    description:
      "Race against the clock. Simulates real exam conditions with a countdown timer.",
    icon: "Timer",
  },
] as const;
