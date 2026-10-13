import { QuizEntryScreen, type QuizPath } from "@/features/quiz";

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
  const initialSelection = requestedChoice;

  return (
    <QuizEntryScreen
      initialPath={initialPath}
      initialSelection={initialSelection}
    />
  );
}
