import { db } from "@/helper/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { map, pick, sortBy } from "lodash";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getDevices = createAsyncThunk("device/getDevices", async () => {
  const ref = collection(db, "devices");
  const _data = await getDocs(ref);
  const { docs } = pick(_data, "docs", []);
  return map(docs, (doc) => doc.id);
});
export const getCurrent = createAsyncThunk(
  "device/getCurrent",
  async (_, { getState }) => {
    const _doc = doc(db, "users", getState().auth.user.uid);
    const _data = await getDoc(_doc);
    return pick(_data.data(), "devices", []);
  }
);
export const changeDevice = createAsyncThunk(
  "device/addDevices",
  async (devices, { getState }) => {
    const userDoc = doc(db, "users", getState().auth.user.uid);
    await updateDoc(userDoc, {
      devices,
    });
    return devices;
  }
);
export const getRecords = createAsyncThunk("device/getRecords", async (id) => {
  const dateSort = (a, b) => {
    return a.timestamp.seconds - b.timestamp.seconds;
  };
  const ref = collection(db, "devices", id, "data");
  const data = await getDocs(ref);
  const { docs } = pick(data, "docs", []);
  const mappedData = map(docs, (doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return mappedData.sort(dateSort);
});

const deviceSlice = createSlice({
  name: "device",
  initialState: {
    loading: false,
    devices: [],
    records: [],
    error: null,
    current: [],
  },
  extraReducers: {
    [getDevices.fulfilled]: (state, action) => {
      state.devices = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getDevices.pending]: (state) => {
      state.loading = true;
    },
    [getDevices.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.devices = [];
    },
    [getRecords.fulfilled]: (state, action) => {
      state.records = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getRecords.pending]: (state) => {
      state.loading = true;
    },
    [getRecords.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.records = [];
    },
    [changeDevice.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.loading = false;
    },
    [getCurrent.fulfilled]: (state, action) => {
      state.current = action.payload.devices;
      state.loading = false;
    },
    [getCurrent.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const deviceReducer = deviceSlice.reducer;
