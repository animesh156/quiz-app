import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: '17', // Default value for Science
  difficulty: 'easy', // Default difficulty
  totalQuestion: '5', // Default total questions
  type: 'multiple', // Default type (Multiple Choice)
}

const quizSlice = createSlice(
    {
        name: 'quizOptions',
        initialState,
        reducers: {
            setCategory: (state, action) => {
                state.category = action.payload
            },
            setDifficulty: (state,action) => {
                state.difficulty = action.payload
            },
            setTotalQuestions: (state,action) => {
            state.totalQuestion = action.payload
            },
            setType: (state,action) => {
                state.type = action.payload
            },
            resetQuiz: () => initialState, 
        },
    }
);

export const {setCategory, setDifficulty, setTotalQuestions, setType, resetQuiz} = quizSlice.actions;
export default quizSlice.reducer;