import{j as s,u as o,m as l,r as c,f as m,g as d,O as _}from"./index-66b557c3.js";const p=()=>s.jsx("main",{className:"page__main page__main--favorites page__main--favorites-empty",children:s.jsx("div",{className:"page__favorites-container container",children:s.jsxs("section",{className:"favorites favorites--empty",children:[s.jsx("h1",{className:"visually-hidden",children:"Favorites (empty)"}),s.jsxs("div",{className:"favorites__status-wrapper",children:[s.jsx("b",{className:"favorites__status",children:"Nothing yet saved."}),s.jsx("p",{className:"favorites__status-description",children:"Save properties to narrow down search or plan your future trips."})]})]})})}),f="_page_c9blb_1",v={page:f},j=()=>{const{fetchStatus:{loading:r,error:n},favoritesOffers:t}=o(l),i=c.useMemo(()=>t.reduce((e,a)=>(e[a.city.name]||(e[a.city.name]=[]),e[a.city.name].push(a),e),{}),[t]);return m(n),r?s.jsx(d,{size:"l"}):t.length?s.jsx("main",{className:`page__main page__main--favorites ${v.page}`,children:s.jsx("div",{className:"page__favorites-container container",children:s.jsxs("section",{className:"favorites",children:[s.jsx("h1",{className:"favorites__title",children:"Saved listing"}),s.jsx("ul",{className:"favorites__list",children:Object.keys(i).length&&Object.entries(i).map(([e,a])=>s.jsxs("li",{className:"favorites__locations-items",children:[s.jsx("div",{className:"favorites__locations locations locations--current",children:s.jsx("div",{className:"locations__item",children:s.jsx("div",{className:"locations__item-link",children:s.jsx("span",{children:e})})})}),a.length&&s.jsx(_,{offers:a,type:"favorites"})]},e))})]})})}):s.jsx(p,{})};export{j as default};
