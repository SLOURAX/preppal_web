import { BrainCircuit } from "lucide-react";

export default function QuizPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="bg-primary/10 mb-4 rounded-full p-4">
        <BrainCircuit className="text-primary h-9 w-9" />
      </div>
      <h1 className="text-foreground mb-2 text-xl font-bold tracking-tight">
        Quiz
      </h1>
      <p className="text-muted-foreground max-w-md text-sm">
        Test your knowledge, build confidence, and earn Preppal points. Take
        daily quizzes across a range of subjects and topics.
      </p>
    </main>
  );
}
