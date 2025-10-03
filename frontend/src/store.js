import { create } from "zustand";

const useQuizStore = create((set) => ({
  // Initial state
  category: "17", // Default value for Science
  difficulty: "easy", // Default difficulty
  totalQuestion: "5", // Default total questions
  type: "multiple", // Default type (Multiple Choice)

  //Actions
  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setTotalQuestions: (totalQuestion) => set({ totalQuestion }),
  setType: (type) => set({ type }),
  resetQuiz: () =>
    set({
      category: "17",
      difficulty: "easy",
      totalQuestion: "5",
      type: "multiple",
    }),
}));

export default useQuizStore;
