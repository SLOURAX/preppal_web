import { create } from "zustand";

interface QuizState {
  selectedExam: string | null;
  selectedSubject: string | null;
  setSelectedExam: (selectedExam: string | null) => void;
  setSelectedSubject: (selectedSubject: string | null) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  selectedExam: null,
  selectedSubject: null,
  setSelectedExam: (selectedExam) => set({ selectedExam }),
  setSelectedSubject: (selectedSubject) => set({ selectedSubject }),
  reset: () => set({ selectedExam: null, selectedSubject: null }),
}));
