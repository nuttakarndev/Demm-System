(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{4167:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return a(882)}])},882:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return p}});var i=a(1844),l=a(2175),n=a(9008),r=a.n(n),t=a(5600),o=a(9403),c=a(6310),d=a(9473),m=a(1395),u=a(1163),h=a(5784);function p(){let e=(0,u.useRouter)(),{error:s,loading:a,user:n}=(0,d.v9)(e=>e.auth),p=(0,d.I0)(),j=async e=>{p((0,m.ii)(e))};(0,h.useEffect)(()=>{n&&e.push("/")},[e,n]);let f=(0,l.TA)({initialValues:{email:"",password:""},validationSchema:(0,c.Ry)().shape({email:(0,c.Z_)().required("Email is required!").email(),password:(0,c.Z_)().required("Password is required!")}),onSubmit:e=>j(e)});return(0,i.jsxs)("main",{children:[(0,i.jsx)(r(),{children:(0,i.jsx)("title",{children:"Login to DEMM System"})}),(0,i.jsxs)("div",{className:"login-container",children:[(0,i.jsx)("div",{className:"cover",children:(0,i.jsx)("img",{src:"https://wallpaperaccess.com/full/1154063.jpg",alt:"wallpaperaccess"})}),(0,i.jsxs)("form",{onSubmit:f.handleSubmit,className:"flex flex-column align-items-center justify-content-center login-form",children:[(0,i.jsx)("h1",{children:"DEMM System"}),(0,i.jsx)("span",{className:"text-500",children:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, quibusdam."}),(0,i.jsxs)("span",{className:"p-float-label login-input mt-5",children:[(0,i.jsx)(t.o,{className:f.errors.email&&"p-invalid",id:"email",type:"email",onChange:f.handleChange,value:f.values.email}),(0,i.jsx)("label",{htmlFor:"email",children:"Email"})]}),(0,i.jsx)(x,{errors:f.errors,name:"email",touched:f.touched}),(0,i.jsxs)("span",{className:"p-float-label login-input mt-5",children:[(0,i.jsx)(t.o,{className:f.errors.password&&"p-invalid",id:"password",name:"password",type:"password",onChange:f.handleChange,value:f.values.password}),(0,i.jsx)("label",{htmlFor:"password",children:"Password"})]}),(0,i.jsx)(x,{errors:f.errors,name:"password",touched:f.touched}),s&&(0,i.jsx)("small",{style:{width:"350px"},className:"text-red-500",children:s}),(0,i.jsxs)("div",{className:"flex gap-3 align-items-center mt-4",children:[(0,i.jsx)(o.z,{loading:a,label:"Sign in",icon:"pi pi-sign-in",type:"submit"}),(0,i.jsx)(o.z,{text:!0,label:"Register",onClick:()=>e.push("/register")})]})]})]})]})}function x(e){let{errors:s,name:a,touched:l}=e;return!s[a]&&l[a]?(0,i.jsx)(i.Fragment,{}):(0,i.jsx)("div",{className:"text-left",style:{width:"350px"},children:(0,i.jsx)("small",{className:"text-red-500",children:s[a]})})}},9008:function(e,s,a){e.exports=a(5322)}},function(e){e.O(0,[518,127,888,179],function(){return e(e.s=4167)}),_N_E=e.O()}]);