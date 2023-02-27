import { db } from "@/helper/firebase";
import { doc, getDoc } from "firebase/firestore";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getSetting = createAsyncThunk("setting/getSetting", async () => {
  const ref = doc(db, "settings", "template");
  const _data = await getDoc(ref);
  return _data.data();
});
const settingSlice = createSlice({
  name: "setting",
  initialState: {
    settings: {},
    loading: false,
  },
  extraReducers: {
    [getSetting.fulfilled]: (state, action) => {
      state.settings = action.payload;
      state.loading = false;
    },
    [getSetting.pending]: (state) => {
      state.loading = true;
    },
  },
});

export const settingReducer = settingSlice.reducer;
