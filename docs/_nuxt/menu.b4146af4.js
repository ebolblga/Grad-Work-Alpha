import{_ as n}from"./my-button.ec06f295.js";import{a as c,o as l,j as m,J as _,F as t,G as e,W as r,q as a}from"./entry.259bf6ae.js";import{u}from"./composables.a4fb48ea.js";import{_ as f}from"./stankin-logo.9e4a1e79.js";import{N as i}from"./navbar.a0aa8825.js";const d={class:"h-screen flex flex-col"},p={class:"h-[92vh] p-5 flex justify-center"},x={class:"w-[40%] flex flex-col my-auto min-w-[360px]"},h=_("img",{src:f,alt:"Stankin logo",class:"w-[180px] h-[180px] mx-auto"},null,-1),V=c({__name:"menu",setup(w){return u({title:"Главное меню"}),(N,b)=>{const o=n,s=r;return l(),m("div",d,[_("div",p,[_("div",x,[h,t(s,{to:"/scanPDF"},{default:e(()=>[t(o,{class:"mb-7 w-full"},{default:e(()=>[a("Считать из PDF")]),_:1})]),_:1}),t(s,{to:"/scan"},{default:e(()=>[t(o,{class:"mb-7 w-full"},{default:e(()=>[a("Сканировать изображение")]),_:1})]),_:1}),t(s,{to:"/cloud"},{default:e(()=>[t(o,{class:"mb-7 w-full"},{default:e(()=>[a("Скачать из облака")]),_:1})]),_:1})])]),t(i)])}}});export{V as default};