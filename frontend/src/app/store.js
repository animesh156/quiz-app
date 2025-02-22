import { configureStore } from "@reduxjs/toolkit";

import quizOptionsReducer from "../features/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    quizOptions: quizOptionsReducer,
  },
});
