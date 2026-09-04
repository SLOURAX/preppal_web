export type QuizPath = "exam" | "subject";
export type QuizSetupStep =
  | "entry"
  | "exam-subject"
  | "exam-year"
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

export const EXAM_CHOICES: readonly QuizChoice[] = [
  {
    value: "jamb",
    label: "JAMB",
    description: "Prepare for the Unified Tertiary Matriculation Examination.",
  },
  {
    value: "waec",
    label: "WAEC",
    description:
      "Practise toward the West African Senior School Certificate Examination.",
  },
  {
    value: "neco",
    label: "NECO",
    description:
      "Prepare with questions aligned to the national examination format.",
  },
];

export const SUBJECT_CHOICES: readonly QuizChoice[] = [
  {
    value: "mathematics",
    label: "Mathematics",
    description:
      "Build accuracy across calculations, algebra, geometry, and more.",
  },
  {
    value: "english-language",
    label: "English Language",
    description:
      "Practise comprehension, grammar, vocabulary, and written expression.",
  },
  {
    value: "biology",
    label: "Biology",
    description: "Review living systems, ecology, genetics, and human biology.",
  },
  {
    value: "chemistry",
    label: "Chemistry",
    description:
      "Explore matter, reactions, equations, and practical chemistry.",
  },
  {
    value: "physics",
    label: "Physics",
    description:
      "Practise mechanics, energy, electricity, waves, and measurement.",
  },
  {
    value: "government",
    label: "Government",
    description:
      "Study civic systems, political institutions, and public administration.",
  },
];

export const EXAM_YEARS: readonly number[] = Array.from(
  { length: 12 },
  (_, index) => 2026 - index,
);

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

export const SUBJECT_TOPICS: Readonly<Record<string, readonly string[]>> = {
  mathematics: [
    "Number and numeration",
    "Algebra",
    "Geometry",
    "Trigonometry",
    "Statistics",
    "Calculus",
  ],
  "english-language": [
    "Comprehension",
    "Grammar",
    "Vocabulary",
    "Oral English",
    "Summary writing",
    "Literature skills",
  ],
  biology: [
    "Cell biology",
    "Genetics",
    "Ecology",
    "Evolution",
    "Human physiology",
    "Plant biology",
  ],
  chemistry: [
    "Atomic structure",
    "Chemical bonding",
    "Stoichiometry",
    "Organic chemistry",
    "Acids and bases",
    "Electrochemistry",
  ],
  physics: [
    "Mechanics",
    "Waves",
    "Electricity",
    "Thermal physics",
    "Optics",
    "Modern physics",
  ],
  government: [
    "Political concepts",
    "Systems of government",
    "Constitutions",
    "Public administration",
    "Political parties",
    "International relations",
  ],
};

export const EXAM_SUBJECTS: Readonly<Record<string, readonly QuizChoice[]>> = {
  jamb: [
    {
      value: "mathematics",
      label: "Mathematics",
    },
    {
      value: "english",
      label: "English Language",
    },
    {
      value: "biology",
      label: "Biology",
    },
    {
      value: "chemistry",
      label: "Chemistry",
    },
    {
      value: "physics",
      label: "Physics",
    },
    {
      value: "government",
      label: "Government",
    },
    {
      value: "economics",
      label: "Economics",
    },
    {
      value: "commerce",
      label: "Commerce",
    },
    {
      value: "accounting",
      label: "Accounting",
    },
    {
      value: "literature",
      label: "Literature in English",
    },
    {
      value: "geography",
      label: "Geography",
    },
    {
      value: "history",
      label: "History",
    },
  ],
  waec: [
    {
      value: "mathematics",
      label: "Mathematics",
    },
    {
      value: "english",
      label: "English Language",
    },
    {
      value: "biology",
      label: "Biology",
    },
    {
      value: "chemistry",
      label: "Chemistry",
    },
    {
      value: "physics",
      label: "Physics",
    },
    {
      value: "economics",
      label: "Economics",
    },
    {
      value: "government",
      label: "Government",
    },
    {
      value: "accounting",
      label: "Financial Accounting",
    },
    {
      value: "commerce",
      label: "Commerce",
    },
    {
      value: "geography",
      label: "Geography",
    },
    {
      value: "agric",
      label: "Agricultural Science",
    },
    {
      value: "civic",
      label: "Civic Education",
    },
  ],
  neco: [
    {
      value: "mathematics",
      label: "Mathematics",
    },
    {
      value: "english",
      label: "English Language",
    },
    {
      value: "biology",
      label: "Biology",
    },
    {
      value: "chemistry",
      label: "Chemistry",
    },
    {
      value: "physics",
      label: "Physics",
    },
    {
      value: "government",
      label: "Government",
    },
    {
      value: "economics",
      label: "Economics",
    },
    {
      value: "agric",
      label: "Agricultural Science",
    },
    {
      value: "civic",
      label: "Civic Education",
    },
    {
      value: "commerce",
      label: "Commerce",
    },
  ],
};

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
