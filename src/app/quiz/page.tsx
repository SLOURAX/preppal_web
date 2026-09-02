import {
  EXAM_CHOICES,
  QuizEntryScreen,
  SUBJECT_CHOICES,
  type QuizPath,
} from "@/features/quiz";

interface QuizPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const params = await searchParams;
  const requestedPath = typeof params.path === "string" ? params.path : "exam";
  const initialPath: QuizPath =
    requestedPath === "subject" ? "subject" : "exam";
  const requestedChoice =
    typeof params.choice === "string" ? params.choice : "";
  const availableChoices =
    initialPath === "exam" ? EXAM_CHOICES : SUBJECT_CHOICES;
  const initialSelection = availableChoices.some(
    (choice) => choice.value === requestedChoice,
  )
    ? requestedChoice
    : "";

  return (
    <QuizEntryScreen
      initialPath={initialPath}
      initialSelection={initialSelection}
    />
  );
}
