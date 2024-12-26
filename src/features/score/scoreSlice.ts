import { createAppSlice } from "../../app/createAppSlice"

export interface ScoreSliceState {
  boyStep: number
  girlStep: number
}

const initialState: ScoreSliceState = {
  girlStep: 0,
  boyStep: 0,
}

export const scoreSlice = createAppSlice({
  name: "score",
  initialState,
  reducers: create => ({
    incrementBoys: create.reducer(state => {
      if(state.boyStep >= 3 || state.girlStep === 3) return;

      state.boyStep += 1
    }),

    incrementGirls: create.reducer(state => {
      if(state.girlStep >= 3 || state.boyStep === 3) return;

      state.girlStep += 1
    }),

    decrementGirls: create.reducer(state => {
      if(state.girlStep <= 0) return;

      state.girlStep -= 1
    }),

    decrementBoys: create.reducer(state => {
      if(state.boyStep <= 0) return;

      state.boyStep -= 1
    }),
  }),
  selectors: {
    selectBoyStep: counter => counter.boyStep,
    selectGirlStep: counter => counter.girlStep,
  },
});

export const {  incrementBoys, incrementGirls, decrementBoys, decrementGirls } = scoreSlice.actions

export const { selectBoyStep, selectGirlStep } = scoreSlice.selectors
