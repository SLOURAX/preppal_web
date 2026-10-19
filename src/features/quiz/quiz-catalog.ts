export interface QuizQuestionCounts {
  readonly total: number;
  readonly EASY: number;
  readonly MEDIUM: number;
  readonly HARD: number;
}

export interface QuizCatalogTopic {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly questionCounts: QuizQuestionCounts;
}

export interface QuizCatalogSubject {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly topics: readonly QuizCatalogTopic[];
  readonly questionCounts: QuizQuestionCounts;
}

export interface QuizCatalogExamSubject {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly years: readonly {
    readonly id: string;
    readonly examYear: { readonly id: string; readonly year: number };
    readonly questionCounts: QuizQuestionCounts;
    readonly topics: readonly QuizCatalogTopic[];
  }[];
  readonly topics: readonly QuizCatalogTopic[];
  readonly questionCounts: QuizQuestionCounts;
}

export interface QuizCatalogExam {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly subjects: readonly QuizCatalogExamSubject[];
}

export interface QuizCatalog {
  readonly exams: readonly QuizCatalogExam[];
  readonly standaloneSubjects: readonly QuizCatalogSubject[];
}
