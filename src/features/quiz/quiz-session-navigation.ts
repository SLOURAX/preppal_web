const COMPLETED_QUIZ_KEY = "preppal.quiz.completed";

function canUseSessionStorage(): boolean {
  return typeof window !== "undefined";
}

export function markQuizCompleted(): void {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.setItem(COMPLETED_QUIZ_KEY, "true");
}

export function clearCompletedQuiz(): void {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.removeItem(COMPLETED_QUIZ_KEY);
}

export function hasCompletedQuiz(): boolean {
  if (!canUseSessionStorage()) return false;
  return window.sessionStorage.getItem(COMPLETED_QUIZ_KEY) === "true";
}
