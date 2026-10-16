import { apiClient } from "@/lib/api/client";

export interface AiPracticeQuestion {
  id: string;
  subject: string;
  topic: string | null;
  difficulty: string;
  question: string;
  options: Array<{ id: "A" | "B" | "C" | "D"; label: string }>;
  expiresAt: string;
}

export function generatePracticeQuestion(input: {
  subject: string;
  topic?: string;
  difficulty?: "easy" | "medium" | "hard";
}) {
  return apiClient<AiPracticeQuestion>("/api/v1/ai/tutor/questions", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function answerPracticeQuestion(
  questionId: string,
  selectedOptionId?: string,
) {
  return apiClient<{
    isCorrect: boolean | null;
    correctOptionId: string;
    feedback: string;
    explanation: string;
  }>(`/api/v1/ai/tutor/questions/${questionId}/answer`, {
    method: "POST",
    body: JSON.stringify(selectedOptionId ? { selectedOptionId } : {}),
  });
}

export function getPracticeHint(questionId: string) {
  return apiClient<{ hint: string }>(
    `/api/v1/ai/tutor/questions/${questionId}/hint`,
  );
}

export function askPracticeQuestion(questionId: string, message: string) {
  return apiClient<{ answer: string; requestId: string }>(
    `/api/v1/ai/tutor/questions/${questionId}/ask`,
    { method: "POST", body: JSON.stringify({ message }) },
  );
}

export interface AiFlashcard {
  id: string;
  category: string;
  question: string;
  answer: string;
  dayKey: string;
  sequence: number;
}

export function getDailyFlashcard() {
  return apiClient<AiFlashcard>("/api/v1/ai/tutor/flashcards/daily", {
    method: "POST",
  });
}

export function getNextFlashcard() {
  return apiClient<AiFlashcard>("/api/v1/ai/tutor/flashcards/next", {
    method: "POST",
  });
}
