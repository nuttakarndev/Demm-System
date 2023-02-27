"use strict";
exports.id = 981;
exports.ids = [981];
exports.modules = {

/***/ 802:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "db": () => (/* binding */ db),
  "Z": () => (/* binding */ firebase)
});

// EXTERNAL MODULE: external "firebase/app"
var app_ = __webpack_require__(324);
// EXTERNAL MODULE: external "@firebase/firestore"
var firestore_ = __webpack_require__(11);
;// CONCATENATED MODULE: ./src/helper/config/firebaseConfig.js
/* harmony default export */ const firebaseConfig = ({
    apiKey: "AIzaSyAYHEnpEE6mCVYSPX4hICfj1ksWlVdbxOQ",
    authDomain: "digital-meter-72a4d.firebaseapp.com",
    projectId: "digital-meter-72a4d",
    storageBucket: "digital-meter-72a4d.appspot.com",
    messagingSenderId: "965460698716",
    appId: "1:965460698716:web:eda0b77442a034e8a86899",
    measurementId: "G-HNM03G2QNC"
});

;// CONCATENATED MODULE: ./src/helper/firebase/index.js



const app = (0,app_.initializeApp)(firebaseConfig);
const db = (0,firestore_.getFirestore)(app);
/* harmony default export */ const firebase = (app);


/***/ }),

/***/ 981:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "dX": () => (/* binding */ authReducer),
  "V0": () => (/* binding */ clearUserError),
  "ii": () => (/* binding */ userSignIn),
  "UX": () => (/* binding */ userSignOut),
  "EQ": () => (/* binding */ userSignUp)
});

// EXTERNAL MODULE: external "firebase/auth"
var auth_ = __webpack_require__(610);
// EXTERNAL MODULE: external "firebase/firestore"
var firestore_ = __webpack_require__(58);
// EXTERNAL MODULE: ./src/helper/firebase/index.js + 1 modules
var firebase = __webpack_require__(802);
;// CONCATENATED MODULE: ./src/helper/hook/useAuth.js



function useAuth() {
    const auth = (0,auth_.getAuth)(firebase/* default */.Z);
    const signUp = async (email, password)=>{
        const user = await (0,auth_.createUserWithEmailAndPassword)(auth, email, password);
        (0,firestore_.setDoc)((0,firestore_.doc)(firebase.db, "users", user.user.uid), {
            uid: user.user.uid,
            email: user.user.email,
            role: "user"
        });
        return user;
    };
    const signIn = (email, password)=>(0,auth_.signInWithEmailAndPassword)(auth, email, password);
    const signOut = ()=>(0,auth_.signOut)(auth);
    return {
        signUp,
        signIn,
        signOut
    };
}

;// CONCATENATED MODULE: ./src/helper/redux/slice/auth.slice.js

const { createSlice , createAsyncThunk  } = __webpack_require__(184);
const userSignIn = createAsyncThunk("auth/sigIn", async ({ email , password  }, { rejectWithValue  })=>{
    try {
        const { signIn  } = useAuth();
        const { user  } = await signIn(email, password);
        return user;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
const userSignUp = createAsyncThunk("auth/signUp", async ({ email , password  }, { rejectWithValue  })=>{
    try {
        const { signUp  } = useAuth();
        const { user  } = await signUp(email, password);
        return user;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
const clearUserError = createAsyncThunk("auth/reset", async ()=>{
    return {};
});
const userSignOut = createAsyncThunk("auth/signOut", async ()=>{
    const { signOut  } = useAuth();
    const result = await signOut();
    return result;
});
const auth = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    extraReducers: {
        [userSignIn.pending]: (state)=>{
            state.loading = true;
        },
        [userSignIn.fulfilled]: (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        [userSignIn.rejected]: (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        [userSignOut.pending]: (state)=>{
            state.loading = true;
        },
        [userSignOut.fulfilled]: (state, action)=>{
            state.loading = false;
            state.user = null;
            state.error = null;
        },
        [userSignOut.rejected]: (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        [userSignUp.pending]: (state)=>{
            state.loading = true;
        },
        [userSignUp.fulfilled]: (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        [userSignUp.rejected]: (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        [clearUserError.fulfilled]: (state)=>{
            state.error = null;
            state.loading = false;
        }
    }
});
const authReducer = auth.reducer;


/***/ })

};
;