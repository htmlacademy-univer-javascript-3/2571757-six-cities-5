import{u,e as p,c as d,r as h,j as e,h as c,g as N,i as m,k as w,A as S,f as b,l as y}from"./index-858d6bcd.js";const C=({title:i})=>{const{authorizeStatus:{loading:t,validationErrors:s}}=u(p),{authorize:n}=d(),[a,l]=h.useState({email:"",password:""}),r=o=>{const{name:x,value:j}=o.target;l(f=>({...f,[x]:j}))},_=o=>{o.preventDefault(),a.email&&a.password&&n(a)},g=!a.email||!a.password;return e.jsxs(e.Fragment,{children:[e.jsx("h1",{className:"login__title",children:i}),e.jsxs("form",{className:"login__form form",action:"#",method:"post",onSubmit:_,children:[e.jsxs("div",{className:"login__input-wrapper form__input-wrapper",children:[e.jsx("label",{className:"visually-hidden",children:"E-mail"}),e.jsx("input",{className:"login__input form__input",type:"email",name:"email",placeholder:"Email",required:!1,onChange:r}),(s==null?void 0:s.email)&&e.jsx("p",{className:c.error,children:s==null?void 0:s.email})]}),e.jsxs("div",{className:"login__input-wrapper form__input-wrapper",children:[e.jsx("label",{className:"visually-hidden",children:"Password"}),e.jsx("input",{className:"login__input form__input",type:"password",name:"password",placeholder:"Password",required:!1,onChange:r}),(s==null?void 0:s.password)&&e.jsx("p",{className:c.error,children:s==null?void 0:s.password})]}),e.jsx("button",{className:"login__submit form__submit button",type:"submit",disabled:g,children:t?e.jsx(N,{size:"s",type:"inline",preset:"white"}):"Sign in"})]})]})},k=()=>m[Math.floor(Math.random()*m.length)],z="_link_1rjeq_1",A={link:z},F=()=>{const{changeCity:i}=d(),{authorizationStatus:t,authorizeStatus:{error:s}}=u(p),n=w(),a=k();h.useEffect(()=>{t===S.Authorized&&n(-1)},[n,t]),b(s);const l=()=>{i(a),n(y.Default)};return e.jsx("main",{className:"page__main page__main--login",children:e.jsxs("div",{className:"page__login-container container",children:[e.jsx("section",{className:"login",children:e.jsx(C,{title:"Sign in"})}),e.jsx("section",{className:"locations locations--login locations--current",children:e.jsx("div",{className:`locations__item locations__item-link ${A.link}`,onClick:l,children:e.jsx("span",{children:a})})})]})})};export{F as default};
