import{b as i,Z as c,e,p as u,l as f,C as p,u as t,o as m}from"./entry.8ec03874.js";import{u as d}from"./composables.e19cfc0a.js";const x=i({__name:"default",setup(g){const{public:{base:a}}=c();d({link:[{rel:"icon",href:`https://ebolblga.github.io/Grad-Work-Alpha/favicon.ico`,type:"image/x-icon",id:"favicon"}],htmlAttrs:{lang:"ru"},meta:[{name:"description",content:"Author: ebolblga, Calendar app"}]});const l=e(localStorage.getItem("dyslexiaToggle")==="true"||!1),o=e(Number(localStorage.getItem("fontMultiplier"))||1);let n=l.value?"OpenDyslexic":"Montserrat",s=(16*o.value).toString()+"px";return(r,_)=>(m(),u("div",{class:"h-screen",style:p({fontFamily:t(n),"font-size":t(s)})},[f(r.$slots,"default")],4))}});export{x as default};
