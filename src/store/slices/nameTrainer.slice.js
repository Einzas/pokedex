import { createSlice } from "@reduxjs/toolkit";

const nameTrainerSlice = createSlice({
  name: "nameTrainer",
  initialState: localStorage.getItem("nameTrainer") ??"", 
  reducers: {
    setNameTrainer: (state, action) => {
      state =action.payload;
      localStorage.setItem("nameTrainer", action.payload);
      return state;
    },
  },
});

export const { setNameTrainer } = nameTrainerSlice.actions;
export default nameTrainerSlice.reducer;
