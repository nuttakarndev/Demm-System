(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 803:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MyApp)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(786);
;// CONCATENATED MODULE: external "redux-logger"
const external_redux_logger_namespaceObject = require("redux-logger");
;// CONCATENATED MODULE: external "redux-persist"
const external_redux_persist_namespaceObject = require("redux-persist");
;// CONCATENATED MODULE: external "redux-persist/lib/storage"
const storage_namespaceObject = require("redux-persist/lib/storage");
var storage_default = /*#__PURE__*/__webpack_require__.n(storage_namespaceObject);
;// CONCATENATED MODULE: external "redux-thunk"
const external_redux_thunk_namespaceObject = require("redux-thunk");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_namespaceObject);
// EXTERNAL MODULE: ./src/helper/redux/slice/auth.slice.js + 1 modules
var auth_slice = __webpack_require__(981);
// EXTERNAL MODULE: ./src/helper/redux/slice/device.sliec.js
var device_sliec = __webpack_require__(316);
;// CONCATENATED MODULE: ./src/helper/redux/reducers.js


const { combineReducers  } = __webpack_require__(184);
const reducers = combineReducers({
    auth: auth_slice/* authReducer */.dX,
    device: device_sliec/* deviceReducer */.P5
});

;// CONCATENATED MODULE: ./src/helper/redux/configureStore.js





const { compose , applyMiddleware , legacy_createStore  } = __webpack_require__(184);
const logger = (0,external_redux_logger_namespaceObject.createLogger)({
    collapsed: (_, __, logEntry)=>!logEntry.error
});
const composeEnhancers =  false ? 0 : compose;
const enhancer = composeEnhancers(applyMiddleware((external_redux_thunk_default()), logger));
const persistConfig = {
    key: "root",
    storage: (storage_default()),
    whitelist: [
        "auth"
    ],
    getStoreState: false,
    debug: false
};
const persistedReducer = (0,external_redux_persist_namespaceObject.persistReducer)(persistConfig, reducers);
const store = legacy_createStore(persistedReducer, enhancer);
const persistor = (0,external_redux_persist_namespaceObject.persistStore)(store);

// EXTERNAL MODULE: ./node_modules/primereact/resources/themes/lara-light-indigo/theme.css
var theme = __webpack_require__(951);
// EXTERNAL MODULE: ./node_modules/primereact/resources/primereact.min.css
var primereact_min = __webpack_require__(626);
// EXTERNAL MODULE: ./node_modules/primeicons/primeicons.css
var primeicons = __webpack_require__(248);
// EXTERNAL MODULE: ./src/pages/_app.css
var _app = __webpack_require__(631);
// EXTERNAL MODULE: ./node_modules/primeflex/primeflex.css
var primeflex = __webpack_require__(723);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(22);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(38);
;// CONCATENATED MODULE: external "primereact/toast"
const toast_namespaceObject = require("primereact/toast");
;// CONCATENATED MODULE: ./src/helper/context/AppProvider.jsx



const AppContext = /*#__PURE__*/ (0,react_.createContext)({});
function AppProvider({ children  }) {
    const toast = (0,react_.useRef)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(AppContext.Provider, {
        value: {},
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(toast_namespaceObject.Toast, {
                ref: toast
            }),
            children
        ]
    });
}
function useFunction() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useLoading must be used within AppProvider");
    }
    return context;
}

;// CONCATENATED MODULE: external "redux-persist/integration/react"
const integration_react_namespaceObject = require("redux-persist/integration/react");
;// CONCATENATED MODULE: ./src/pages/_app.jsx
// add bootstrap css










function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
        store: store,
        children: /*#__PURE__*/ jsx_runtime_.jsx(integration_react_namespaceObject.PersistGate, {
            loading: null,
            persistor: persistor,
            children: /*#__PURE__*/ jsx_runtime_.jsx(AppProvider, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                })
            })
        })
    });
}


/***/ }),

/***/ 723:
/***/ (() => {



/***/ }),

/***/ 248:
/***/ (() => {



/***/ }),

/***/ 626:
/***/ (() => {



/***/ }),

/***/ 951:
/***/ (() => {



/***/ }),

/***/ 631:
/***/ (() => {



/***/ }),

/***/ 11:
/***/ ((module) => {

"use strict";
module.exports = require("@firebase/firestore");

/***/ }),

/***/ 184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 324:
/***/ ((module) => {

"use strict";
module.exports = require("firebase/app");

/***/ }),

/***/ 610:
/***/ ((module) => {

"use strict";
module.exports = require("firebase/auth");

/***/ }),

/***/ 58:
/***/ ((module) => {

"use strict";
module.exports = require("firebase/firestore");

/***/ }),

/***/ 517:
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),

/***/ 38:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 786:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 22:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [981,316], () => (__webpack_exec__(803)));
module.exports = __webpack_exports__;

})();