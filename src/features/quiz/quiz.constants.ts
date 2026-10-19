export type QuizPath = "exam" | "subject";
export type QuizSetupStep =
  | "entry"
  | "exam-subject"
  | "exam-year"
  | "exam-topics"
  | "subject-difficulty"
  | "subject-topics"
  | "quiz-mode";
export type QuizDifficulty = "easy" | "medium" | "hard";
export type QuizMode = "timed" | "untimed";

export interface QuizChoice {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}

export interface DifficultyChoice {
  readonly value: QuizDifficulty;
  readonly label: string;
  readonly description: string;
  readonly estimatedLevel: string;
}

export const DIFFICULTY_CHOICES: readonly DifficultyChoice[] = [
  {
    value: "easy",
    label: "Easy",
    description: "Build confidence with clear, foundational questions.",
    estimatedLevel: "Good for revision",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Work through balanced questions at exam-ready depth.",
    estimatedLevel: "Most popular",
  },
  {
    value: "hard",
    label: "Hard",
    description: "Challenge yourself with complex, multi-step questions.",
    estimatedLevel: "Advanced practice",
  },
];

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
