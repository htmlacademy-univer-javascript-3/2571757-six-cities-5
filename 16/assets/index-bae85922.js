import{r,x as i,D as R,y as w,z as L,j as E}from"./index-d77cae1a.js";const b=(o,a)=>{const[n,e]=r.useState(null),s=r.useRef(!1);return r.useEffect(()=>{if(o.current&&!s.current&&a){const{latitude:l,longitude:c}=a.location,u=new i.Map(o.current,{center:{lat:l,lng:c},zoom:R}),p=new i.TileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'});u.addLayer(p),e(u),s.current=!0}},[o,a]),n},T=({width:o="512px",height:a="100%",offers:n,activeCityName:e,selectedOffer:s})=>{const l=r.useRef(null),c=r.useRef(i.layerGroup()),u=r.useRef([]),p=r.useMemo(()=>{var t;return(t=n.find(d=>d.city.name===e))==null?void 0:t.city},[n,e]),y=r.useMemo(()=>n.filter(t=>t.city.name===e).map(t=>({id:t.id,title:t.title,...t.location})),[n,e]),m=b(l,p);return r.useEffect(()=>{if(m&&p){c.current.clearLayers(),u.current=[];const t=y.map(({latitude:M,longitude:x,id:f,title:g})=>{const h=new i.Marker({lat:M,lng:x}).setIcon(s&&f===s.id?w:L).addTo(c.current);return u.current.push({marker:h,title:g}),[M,x]});c.current.addTo(m);const d=new i.LatLngBounds(t);m.fitBounds(d,{padding:[50,50],maxZoom:R})}},[m,y,s,e,p]),E.jsx("div",{style:{width:o,height:a},ref:l})};export{T as M};
