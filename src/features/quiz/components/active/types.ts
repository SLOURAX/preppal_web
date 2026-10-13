export interface Question {
  id: number;
  text: string;
  passage?: string;
  options: readonly string[];
}

export type QuestionStatus = "answered" | "flagged" | "unanswered";
