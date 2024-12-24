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
      if(state.boyStep >= 4 || state.girlStep === 4) return;

      state.boyStep += 1
    }),

    incrementGirls: create.reducer(state => {
      if(state.girlStep >= 4 || state.boyStep === 4) return;

      state.girlStep += 1
    }),
  }),
  selectors: {
    selectBoyStep: counter => counter.boyStep,
    selectGirlStep: counter => counter.girlStep,
  },
});

export const {  incrementBoys, incrementGirls } = scoreSlice.actions

export const { selectBoyStep, selectGirlStep } = scoreSlice.selectors
