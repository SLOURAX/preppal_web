export interface Question {
  id: number;
  text: string;
  options: readonly string[];
}

export type QuestionStatus = "answered" | "flagged" | "unanswered";
