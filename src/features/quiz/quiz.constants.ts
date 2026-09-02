export type QuizPath = "exam" | "subject";

export interface QuizChoice {
  readonly value: string;
  readonly label: string;
  readonly description: string;
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
