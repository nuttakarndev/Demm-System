"use strict";
exports.id = 990;
exports.ids = [990];
exports.modules = {

/***/ 428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* reexport */ Page)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(786);
// EXTERNAL MODULE: ./src/helper/redux/slice/auth.slice.js + 1 modules
var auth_slice = __webpack_require__(981);
// EXTERNAL MODULE: ./src/helper/redux/slice/device.sliec.js
var device_sliec = __webpack_require__(316);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(853);
// EXTERNAL MODULE: external "primereact/button"
var button_ = __webpack_require__(88);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(38);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(22);
;// CONCATENATED MODULE: ./src/component/Sidebar/Sidebar.jsx







function Sidebar() {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const router = (0,router_.useRouter)();
    const { user , loading  } = (0,external_react_redux_.useSelector)((state)=>state.auth);
    const { current , loading: deviceLoading  } = (0,external_react_redux_.useSelector)((state)=>state.device);
    const logout = ()=>dispatch((0,auth_slice/* userSignOut */.UX)());
    (0,react_.useEffect)(()=>{
        dispatch((0,device_sliec/* getCurrent */.TE)());
    }, [
        dispatch
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("aside", {
        className: "sidebar text-white",
        children: !deviceLoading && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "info",
                    onClick: ()=>router.push("/"),
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "label",
                            children: "SignIn With:"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "email",
                            children: user?.email
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                    className: "devices mt-3",
                    children: current.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(SidebarItem, {
                            device: item,
                            router: router
                        }, item))
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(button_.Button, {
                    className: "p-button-danger w-full mt-auto",
                    label: "Sign out",
                    loading: loading,
                    icon: "pi pi-sign-out",
                    onClick: logout
                })
            ]
        })
    });
}
function SidebarItem({ device , router  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "device",
        onClick: ()=>router.push(`/devices/${device}`),
        children: device
    }, device);
}

;// CONCATENATED MODULE: ./src/component/Sidebar/index.js


;// CONCATENATED MODULE: ./src/component/Page/Page.jsx


function Page({ children  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
        className: "template",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Sidebar, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "p-3 overflow-y-auto",
                children: children
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/component/Page/index.js



/***/ }),

/***/ 511:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ PrivateRoute)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);




function PrivateRoute({ children  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.auth);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (!user) {
            router.push("/login");
        }
    }, [
        router,
        user
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: user ? children : null
    });
}


/***/ })

};
;