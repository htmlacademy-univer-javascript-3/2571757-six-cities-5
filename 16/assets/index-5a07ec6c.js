import{c as u,r as m,u as c,n as b,f as h,j as e,o as E,e as x,g as f,A as R,p as O,s as F,q as k,O as M,k as S,m as T,l as y,t as p,v as C,w as D}from"./index-d77cae1a.js";import{M as P}from"./index-bae85922.js";const z=s=>{switch(s){case 5:return"perfect";case 4:return"good";case 3:return"not bad";case 2:return"badly";case 1:return"terribly";default:return""}},j=50,L=300,U=[5,4,3,2,1],A={rating:void 0,comment:""},$=(s,a)=>{switch(a.type){case"UPDATE_FIELD":return{...s,[a.field]:a.value};case"RESET":return A;default:return s}},G=({offerId:s})=>{const{postOfferComment:a}=u(),[r,t]=m.useReducer($,A),{postStatus:{loading:i,error:o}}=c(b);h(o);const n=m.useCallback(l=>{const{name:v,value:N}=l.target;t({type:"UPDATE_FIELD",field:v,value:v==="rating"?Number(N):N})},[]),_=m.useCallback(l=>{l.preventDefault(),r.comment&&typeof r.rating=="number"&&(a({offerId:s,comment:r.comment,rating:r.rating}),t({type:"RESET"}))},[r,a,s]),d=!(typeof r.rating=="number"&&r.comment&&r.comment.length>=j&&r.comment.length<=L||i);return e.jsxs("form",{className:"reviews__form form",onSubmit:_,children:[e.jsx("label",{className:"reviews__label form__label",htmlFor:"review",children:"Your review"}),e.jsx("div",{className:"reviews__rating-form form__rating",children:U.map(l=>e.jsxs(m.Fragment,{children:[e.jsx("input",{className:"form__rating-input visually-hidden",name:"rating",value:l,id:`${l}-stars`,type:"radio",checked:r.rating===l,onChange:n}),e.jsx("label",{htmlFor:`${l}-stars`,className:"reviews__rating-label form__rating-label",title:z(l),children:e.jsx("svg",{className:"form__star-image",width:"37",height:"33",children:e.jsx("use",{xlinkHref:"#icon-star"})})})]},l))}),e.jsx("textarea",{className:"reviews__textarea form__textarea",id:"comment",name:"comment",value:r.comment,onChange:n,placeholder:"Tell how was your stay, what you like and what can be improved"}),e.jsxs("div",{className:"reviews__button-wrapper",children:[e.jsxs("p",{className:"reviews__help",children:["To submit review please make sure to set ",e.jsx("span",{className:"reviews__star",children:"rating"})," and describe your stay with at least ",e.jsx("b",{className:"reviews__text-amount",children:j}),"."]}),e.jsx("button",{className:"reviews__submit form__submit button",type:"submit",disabled:d,children:"Submit"})]})]})},H=s=>new Date(s).toLocaleString("ru",{year:"numeric",month:"long"}),X=({comment:s})=>e.jsxs("li",{className:"reviews__item",children:[e.jsxs("div",{className:"reviews__user user",children:[e.jsx("div",{className:"reviews__avatar-wrapper user__avatar-wrapper",children:e.jsx("img",{className:"reviews__avatar user__avatar",src:s.user.avatarUrl,width:"54",height:"54",alt:"Reviews avatar"})}),e.jsx("span",{className:"reviews__user-name",children:s.user.name})]}),e.jsxs("div",{className:"reviews__info",children:[e.jsx("div",{className:"reviews__rating rating",children:e.jsxs("div",{className:"reviews__stars rating__stars",children:[e.jsx("span",{style:{width:E(s.rating)}}),e.jsx("span",{className:"visually-hidden",children:"Rating"})]})}),e.jsx("p",{className:"reviews__text",children:s.comment}),e.jsx("time",{className:"reviews__time",children:H(s.date)})]})]}),B=10,W=({comments:s})=>e.jsx("ul",{className:"reviews__list",children:s.slice(0,B).map(a=>e.jsx(X,{comment:a},a.id))}),q=({offerId:s})=>{const{fetchOfferComments:a}=u(),{comments:r,fetchStatus:{loading:t,error:i}}=c(b),{authorizationStatus:o}=c(x),n=r.length;return h(i),m.useEffect(()=>{a({offerId:s})},[s,a]),e.jsxs("section",{className:"offer__reviews reviews",children:[e.jsxs("h2",{className:"reviews__title",children:["Reviews · ",e.jsx("span",{className:"reviews__amount",children:n})]}),t?e.jsx(f,{}):e.jsx(W,{comments:r}),o===R.Authorized&&e.jsx(G,{offerId:s})]})},V=3,Y=4,g=0,J=({offerInfo:s})=>{const{nearestOffers:a,loading:r,error:t}=c(O),{fetchNearestOffers:i}=u(),o=c(F),{authorizationStatus:n}=c(x);if(h(t),m.useEffect(()=>{s!=null&&s.id&&i({offerId:s.id})},[s==null?void 0:s.id,i,n]),!a)return e.jsx("h3",{children:"There is no nearest offers"});if(r)return e.jsx(f,{size:"l"});const _=[...s?[k(s)]:[],...a];return e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"offer__map",children:e.jsx(P,{offers:_.slice(g,Y),activeCityName:o,width:"100%",selectedOffer:s})}),e.jsx("div",{className:"container",children:e.jsxs("section",{className:"near-places places",children:[e.jsx("h2",{className:"near-places__title",children:"Other places in the neighbourhood"}),e.jsx(M,{offers:a.slice(g,V),type:"nearest"})]})})]})},K=s=>s.charAt(0).toUpperCase()+s.slice(1);function w(s,a){switch(new Intl.PluralRules("en",{type:"ordinal"}).select(s)){case"one":return`${s} ${a[0]}`;default:return`${s} ${a[1]}`}}const Q=6,Z=({offerInfo:s,loading:a})=>{const r=S(),{changeFavoriteStatus:t}=u(),{postStatus:{loading:i,error:o}}=c(T),{authorizationStatus:n}=c(x);if(h(o),a)return e.jsx(f,{size:"l"});if(!s)return e.jsx("h1",{children:"Offer data not found"});const _=()=>{if(n===R.Unauthorized){r(y.Login);return}const d=s.isFavorite?p.Remove:p.Add;t({offerId:s.id,status:d})};return e.jsxs("section",{className:"offer",children:[e.jsx("div",{className:"offer__gallery-container container",children:e.jsx("div",{className:"offer__gallery",children:s.images.slice(0,Q).map(d=>e.jsx("div",{className:"offer__image-wrapper",children:e.jsx("img",{className:"offer__image",src:d,alt:"Offer Photo"})},d))})}),e.jsx("div",{className:"offer__container container",children:e.jsxs("div",{className:"offer__wrapper",children:[s.isPremium&&e.jsx("div",{className:"offer__mark",children:e.jsx("span",{children:"Premium"})}),e.jsxs("div",{className:"offer__name-wrapper",children:[e.jsx("h1",{className:"offer__name",children:s.title}),e.jsxs("button",{className:`offer__bookmark-button button ${s.isFavorite&&"offer__bookmark-button--active"}`,type:"button",disabled:i,onClick:_,children:[e.jsx("svg",{className:"offer__bookmark-icon",width:"31",height:"33",children:e.jsx("use",{xlinkHref:"#icon-bookmark"})}),e.jsx("span",{className:"visually-hidden",children:"To bookmarks"})]})]}),e.jsxs("div",{className:"offer__rating rating",children:[e.jsxs("div",{className:"offer__stars rating__stars",children:[e.jsx("span",{style:{width:E(s.rating)}}),e.jsx("span",{className:"visually-hidden",children:"Rating"})]}),e.jsx("span",{className:"offer__rating-value rating__value",children:s.rating})]}),e.jsxs("ul",{className:"offer__features",children:[e.jsx("li",{className:"offer__feature offer__feature--entire",children:K(s.type)}),e.jsx("li",{className:"offer__feature offer__feature--bedrooms",children:w(s.bedrooms,["Bedroom","Bedrooms"])}),e.jsxs("li",{className:"offer__feature offer__feature--adults",children:["Max ",w(s.maxAdults,["adult","adults"])]})]}),e.jsxs("div",{className:"offer__price",children:[e.jsxs("b",{className:"offer__price-value",children:["€",s.price]}),e.jsx("span",{className:"offer__price-text",children:" night"})]}),e.jsxs("div",{className:"offer__inside",children:[e.jsx("h2",{className:"offer__inside-title",children:"What's inside"}),e.jsx("ul",{className:"offer__inside-list",children:s.goods.map(d=>e.jsx("li",{className:"offer__inside-item",children:d},d))})]}),e.jsxs("div",{className:"offer__host",children:[e.jsx("h2",{className:"offer__host-title",children:"Meet the host"}),e.jsxs("div",{className:"offer__host-user user",children:[e.jsx("div",{className:"offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper",children:e.jsx("img",{className:"offer__avatar user__avatar",src:s.host.avatarUrl,width:"74",height:"74",alt:"Host avatar"})}),e.jsx("span",{className:"offer__user-name",children:s.host.name}),e.jsx("span",{className:"offer__user-status",children:s.host.isPro?"Pro":"Default"})]}),e.jsx("div",{className:"offer__description",children:e.jsx("p",{className:"offer__text",children:s.description})})]}),e.jsx(q,{offerId:s.id})]})})]})},se=()=>{const{id:s}=C(),a=S(),{fetchOfferInfo:r}=u(),{offerInfo:t,loading:i,error:o}=c(D),{authorizationStatus:n}=c(x);return m.useEffect(()=>{s&&r({offerId:s})},[r,s,n]),h(o,()=>a(y.NotFound)),e.jsxs("main",{className:"page__main page__main--offer",children:[e.jsx(Z,{offerInfo:t,loading:i}),e.jsx(J,{offerInfo:t})]})};export{se as default};