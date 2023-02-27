"use strict";
exports.id = 316;
exports.ids = [316];
exports.modules = {

/***/ 316:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P5": () => (/* binding */ deviceReducer),
/* harmony export */   "PW": () => (/* binding */ getDevices),
/* harmony export */   "Q6": () => (/* binding */ getRecords),
/* harmony export */   "TE": () => (/* binding */ getCurrent),
/* harmony export */   "vq": () => (/* binding */ changeDevice)
/* harmony export */ });
/* harmony import */ var _helper_firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(802);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



const { createSlice , createAsyncThunk  } = __webpack_require__(184);
const getDevices = createAsyncThunk("device/getDevices", async ()=>{
    const ref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_helper_firebase__WEBPACK_IMPORTED_MODULE_0__.db, "devices");
    const _data = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(ref);
    const { docs  } = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.pick)(_data, "docs", []);
    return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.map)(docs, (doc)=>doc.id);
});
const getCurrent = createAsyncThunk("device/getCurrent", async (_, { getState  })=>{
    const _doc = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_helper_firebase__WEBPACK_IMPORTED_MODULE_0__.db, "users", getState().auth.user.uid);
    const _data = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)(_doc);
    return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.pick)(_data.data(), "devices", []);
});
const changeDevice = createAsyncThunk("device/addDevices", async (devices, { getState  })=>{
    const userDoc = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_helper_firebase__WEBPACK_IMPORTED_MODULE_0__.db, "users", getState().auth.user.uid);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.updateDoc)(userDoc, {
        devices
    });
    return devices;
});
const getRecords = createAsyncThunk("device/getRecords", async (id)=>{
    const dateSort = (a, b)=>{
        return a.timestamp.seconds - b.timestamp.seconds;
    };
    const ref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_helper_firebase__WEBPACK_IMPORTED_MODULE_0__.db, "devices", id, "data");
    const data = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(ref);
    const { docs  } = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.pick)(data, "docs", []);
    const mappedData = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.map)(docs, (doc)=>({
            ...doc.data(),
            id: doc.id
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
        current: []
    },
    extraReducers: {
        [getDevices.fulfilled]: (state, action)=>{
            state.devices = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getDevices.pending]: (state)=>{
            state.loading = true;
        },
        [getDevices.rejected]: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.devices = [];
        },
        [getRecords.fulfilled]: (state, action)=>{
            state.records = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getRecords.pending]: (state)=>{
            state.loading = true;
        },
        [getRecords.rejected]: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.records = [];
        },
        [changeDevice.fulfilled]: (state, action)=>{
            state.current = action.payload;
            state.loading = false;
        },
        [getCurrent.fulfilled]: (state, action)=>{
            state.current = action.payload.devices;
            state.loading = false;
        },
        [getCurrent.pending]: (state, action)=>{
            state.loading = true;
        }
    }
});
const deviceReducer = deviceSlice.reducer;


/***/ })

};
;