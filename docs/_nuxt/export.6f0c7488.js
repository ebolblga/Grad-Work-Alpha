import{_ as x}from"./my-button.f4319feb.js";import{u as E}from"./composables.0b23b4be.js";import{t as f}from"./subjectParsing.7a17cc8c.js";import{N as g}from"./navbar.1f371aac.js";import{b as C,p as h,z as S,s as c,v as d,o as A,K as u}from"./entry.7eddd1f1.js";const T={class:"h-screen flex flex-col"},I={class:"h-[92vh] p-5 flex justify-center"},O={class:"w-[40%] flex flex-col my-auto min-w-[360px]"},$=C({__name:"export",setup(j){E({title:"Экспортировать расписание"});const o=JSON.parse(localStorage.getItem("subjectsJSON")||"");function b(){let s=`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MSUT "STANKIN"//Schedule//RU

`;for(let t=0;t<o.length;t++)for(let r=0;r<o[t].dates.length;r++){const w=o[t].type.replace("Лекции","Лекция").replace("Cеминары","Cеминар").replace("Лабораторные занятия","Лабораторное занятие"),p=(o[t].type==="Лабораторные занятия"?f.get(o[t].time+8):f.get(o[t].time)).split(" - "),m=o[t].dates[r].split("T");let l=new Date(m[0]+"T"+p[0]),i=new Date(m[0]+"T"+p[1]);l.setHours(l.getHours()+25),i.setHours(i.getHours()+25),s+=`BEGIN:VEVENT
UID:${t.toString()+r.toString()}
DTSTART:${l.toISOString()}
DTEND:${i.toISOString()}
SUMMARY:${o[t].name}
DESCRIPTION:${w+": "+o[t].groups.join(", ")+" "+o[t].subgroup}
LOCATION:${o[t].location}
END:VEVENT

`}s+="END:VCALENDAR";const e=new Blob([s],{type:"text/ics;charset=UTF-8"}),a=window.URL.createObjectURL(e),n=document.createElement("a");n.setAttribute("href",a),n.setAttribute("download","schedule.ics"),n.click()}function N(){const s=[["Группа или преподователь","Подгруппа","Предмет","Тип занятия","Кабинет","Время","Строка дат","Даты"],...o.map(t=>[t.groups.join(", "),t.subgroup,t.name,t.type,t.location,t.time,t.dateStr,t.dates.join(" ")])].map(t=>t.join(",")).join(`
`),e=new Blob([s],{type:"text/csv;charset=UTF-8"}),a=window.URL.createObjectURL(e),n=document.createElement("a");n.setAttribute("href",a),n.setAttribute("download","schedule.csv"),n.click()}function _(){const s="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(o,null,"	")),e=document.createElement("a");e.setAttribute("href",s),e.setAttribute("download","schedule.json"),document.body.appendChild(e),e.click(),e.remove()}return(s,e)=>{const a=x;return A(),h("div",T,[S("div",I,[S("div",O,[c(a,{onClick:e[0]||(e[0]=n=>b()),class:"mb-7 w-full"},{default:d(()=>[u("Экспортировать ICS")]),_:1}),c(a,{onClick:e[1]||(e[1]=n=>N()),class:"mb-7 w-full"},{default:d(()=>[u("Экспортировать CSV")]),_:1}),c(a,{onClick:e[2]||(e[2]=n=>_()),class:"mb-7 w-full"},{default:d(()=>[u("Экспортировать JSON")]),_:1})])]),c(g)])}}});export{$ as default};
