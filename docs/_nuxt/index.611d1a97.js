import{_ as u}from"./my-button.f4319feb.js";import{u as f}from"./composables.0b23b4be.js";import{b as p,f as d,S as l,p as S,z as e,s as r,v as n,o as _,K as c}from"./entry.7eddd1f1.js";import{_ as I}from"./stankin-logo.9e4a1e79.js";const x={class:"h-screen flex flex-col"},y={class:"h-[92vh] p-5 flex justify-center"},b={class:"w-[40%] flex flex-col my-auto min-w-[360px] text-center"},h=e("p",{class:"font-bold text-5xl"},"Привет!",-1),v=e("p",{class:"font-bold text-lg mb-8"},"Вы к нам в роли кого?",-1),T=e("img",{src:I,alt:"Stankin logo",class:"mx-auto"},null,-1),R=p({__name:"index",setup(N){f({title:"Привет!"}),d(async()=>{try{const o=localStorage.getItem("user");(o==="professor"||o==="student")&&l("/menu")}catch{console.log("failed")}});const a=new Date;function g(){localStorage.setItem("language","RU"),localStorage.setItem("fontMultiplier","1"),localStorage.setItem("epilepsyToggle","false"),localStorage.setItem("visuallyImpairedToggle","false"),localStorage.setItem("dyslexiaToggle","false"),localStorage.setItem("adhdToggle","false"),localStorage.setItem("user","professor"),localStorage.setItem("profName",""),localStorage.setItem("group",""),localStorage.setItem("subjectsJSON",'[{"groups":[""],"name":"Вы не загрузили ни одного расписания","type":"","subgroup":"","location":"","dateStr":"","dates":["'+a.toISOString()+'"],"time":0}]'),l("/menu")}function m(){localStorage.setItem("language","RU"),localStorage.setItem("fontMultiplier","1"),localStorage.setItem("epilepsyToggle","false"),localStorage.setItem("visuallyImpairedToggle","false"),localStorage.setItem("dyslexiaToggle","false"),localStorage.setItem("adhdToggle","false"),localStorage.setItem("user","student"),localStorage.setItem("profName",""),localStorage.setItem("group",""),localStorage.setItem("subjectsJSON",'[{"groups":[""],"name":"Вы не загрузили ни одного расписания","type":"","subgroup":"","location":"","dateStr":"","dates":["'+a.toISOString()+'"],"time":0}]'),l("/menu")}return(o,t)=>{const s=u;return _(),S("div",x,[e("div",y,[e("div",b,[h,v,r(s,{onClick:t[0]||(t[0]=i=>g()),class:"mb-8 w-full"},{default:n(()=>[c("Я преподаватель")]),_:1}),r(s,{onClick:t[1]||(t[1]=i=>m()),class:"w-full"},{default:n(()=>[c("Я студент")]),_:1}),T])])])}}});export{R as default};