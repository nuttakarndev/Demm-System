import useAuth from "@/helper/hook/useAuth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const userSignIn = createAsyncThunk(
  "auth/sigin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { signIn } = useAuth();
      const { user } = await signIn(email, password);
      return user;
    } catch (err) {
      return rejectWithValue("Username or Password incorrect!");
    }
  }
);

export const userSignOut = createAsyncThunk("auth/signOut", async () => {
  const { signOut } = useAuth();
  const result = await signOut();
  return result;
});
const auth = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  extraReducers: {
    [userSignIn.pending]: (state) => {
      state.loading = true;
    },
    [userSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    [userSignIn.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [userSignOut.pending]: (state) => {
      state.loading = true;
    },
    [userSignOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
    [userSignOut.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const authReducer = auth.reducer;
