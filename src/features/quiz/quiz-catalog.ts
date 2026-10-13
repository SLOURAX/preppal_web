export interface QuizCatalogTopic {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
}

export interface QuizCatalogSubject {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly topics: readonly QuizCatalogTopic[];
}

export interface QuizCatalogExamSubject {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly years: readonly {
    readonly id: string;
    readonly examYear: { readonly id: string; readonly year: number };
  }[];
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
