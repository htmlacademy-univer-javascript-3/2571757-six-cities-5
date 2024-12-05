import{j as e,u as o,m as l,r as c,f as m,g as _,O as d}from"./index-d77cae1a.js";const p=()=>e.jsx("main",{className:"page__main page__main--favorites page__main--favorites-empty",children:e.jsx("div",{className:"page__favorites-container container",children:e.jsxs("section",{className:"favorites favorites--empty",children:[e.jsx("h1",{className:"visually-hidden",children:"Favorites (empty)"}),e.jsxs("div",{className:"favorites__status-wrapper",children:[e.jsx("b",{className:"favorites__status",children:"Nothing yet saved."}),e.jsx("p",{className:"favorites__status-description",children:"Save properties to narrow down search or plan your future trips."})]})]})})}),f="_page_c9blb_1",v={page:f},j=()=>{const{fetchStatus:{loading:r,error:n},favoritesOffers:t}=o(l),i=c.useMemo(()=>t.reduce((s,a)=>(s[a.city.name]||(s[a.city.name]=[]),s[a.city.name].push(a),s),{}),[t]);return m(n),r?e.jsx(_,{size:"l"}):t.length?e.jsx("main",{className:`page__main page__main--favorites ${v.page}`,children:e.jsx("div",{className:"page__favorites-container container",children:e.jsxs("section",{className:"favorites",children:[e.jsx("h1",{className:"favorites__title",children:"Saved listing"}),e.jsx("ul",{className:"favorites__list",children:Object.keys(i).length&&Object.entries(i).map(([s,a])=>e.jsxs("li",{className:"favorites__locations-items",children:[e.jsx("div",{className:"favorites__locations locations locations--current",children:e.jsx("div",{className:"locations__item",children:e.jsx("a",{className:"locations__item-link",href:"#",children:e.jsx("span",{children:s})})})}),a.length&&e.jsx(d,{offers:a,type:"favorites"})]},s))})]})})}):e.jsx(p,{})};export{j as default};
