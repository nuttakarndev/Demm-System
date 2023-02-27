import useAuth from "@/helper/hook/useAuth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const userSignIn = createAsyncThunk(
  "auth/sigIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { signIn } = useAuth();
      const { user } = await signIn(email, password);
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { signUp } = useAuth();
      const { user } = await signUp(email, password);
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const clearUserError = createAsyncThunk("auth/reset", async () => {
  return {};
});
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
    [userSignUp.pending]: (state) => {
      state.loading = true;
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    [userSignUp.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [clearUserError.fulfilled]: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
});

export const authReducer = auth.reducer;
