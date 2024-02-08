import{a as et,h as H,b as te,e as ee,r as ne,f as T,w as oe,i as re,o as A,j as at,k as O,u as x,l as ut,c as ft,m as se,p as ie,q as ce,t as le,s as ae}from"./entry.259bf6ae.js";import{u as ue}from"./config.0af93f84.js";const _t=Object.freeze({left:0,top:0,width:16,height:16}),Mt=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),nt=Object.freeze({..._t,...Mt});Object.freeze({...nt,body:"",hidden:!1});({..._t});const Et=Object.freeze({width:null,height:null}),At=Object.freeze({...Et,...Mt});function fe(t,o){const n={...t};for(const r in o){const e=o[r],s=typeof e;r in Et?(e===null||e&&(s==="string"||s==="number"))&&(n[r]=e):s===typeof n[r]&&(n[r]=r==="rotate"?e%4:e)}return n}const he=/[\s,]+/;function de(t,o){o.split(he).forEach(n=>{switch(n.trim()){case"horizontal":t.hFlip=!0;break;case"vertical":t.vFlip=!0;break}})}function pe(t,o=0){const n=t.replace(/^-?[0-9.]*/,"");function r(e){for(;e<0;)e+=4;return e%4}if(n===""){const e=parseInt(t);return isNaN(e)?0:r(e)}else if(n!==t){let e=0;switch(n){case"%":e=25;break;case"deg":e=90}if(e){let s=parseFloat(t.slice(0,t.length-n.length));return isNaN(s)?0:(s=s/e,s%1===0?r(s):0)}}return o}const ge=/(-?[0-9.]*[0-9]+[0-9.]*)/g,me=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function ht(t,o,n){if(o===1)return t;if(n=n||100,typeof t=="number")return Math.ceil(t*o*n)/n;if(typeof t!="string")return t;const r=t.split(ge);if(r===null||!r.length)return t;const e=[];let s=r.shift(),i=me.test(s);for(;;){if(i){const c=parseFloat(s);isNaN(c)?e.push(s):e.push(Math.ceil(c*o*n)/n)}else e.push(s);if(s=r.shift(),s===void 0)return e.join("");i=!i}}const ye=t=>t==="unset"||t==="undefined"||t==="none";function we(t,o){const n={...nt,...t},r={...At,...o},e={left:n.left,top:n.top,width:n.width,height:n.height};let s=n.body;[n,r].forEach(p=>{const h=[],f=p.hFlip,S=p.vFlip;let w=p.rotate;f?S?w+=2:(h.push("translate("+(e.width+e.left).toString()+" "+(0-e.top).toString()+")"),h.push("scale(-1 1)"),e.top=e.left=0):S&&(h.push("translate("+(0-e.left).toString()+" "+(e.height+e.top).toString()+")"),h.push("scale(1 -1)"),e.top=e.left=0);let y;switch(w<0&&(w-=Math.floor(w/4)*4),w=w%4,w){case 1:y=e.height/2+e.top,h.unshift("rotate(90 "+y.toString()+" "+y.toString()+")");break;case 2:h.unshift("rotate(180 "+(e.width/2+e.left).toString()+" "+(e.height/2+e.top).toString()+")");break;case 3:y=e.width/2+e.left,h.unshift("rotate(-90 "+y.toString()+" "+y.toString()+")");break}w%2===1&&(e.left!==e.top&&(y=e.left,e.left=e.top,e.top=y),e.width!==e.height&&(y=e.width,e.width=e.height,e.height=y)),h.length&&(s='<g transform="'+h.join(" ")+'">'+s+"</g>")});const i=r.width,c=r.height,l=e.width,a=e.height;let u,d;i===null?(d=c===null?"1em":c==="auto"?a:c,u=ht(d,l/a)):(u=i==="auto"?l:i,d=c===null?ht(u,a/l):c==="auto"?a:c);const g={},b=(p,h)=>{ye(h)||(g[p]=h.toString())};return b("width",u),b("height",d),g.viewBox=e.left.toString()+" "+e.top.toString()+" "+l.toString()+" "+a.toString(),{attributes:g,body:s}}const be=/\sid="(\S+)"/g,xe="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let Se=0;function ve(t,o=xe){const n=[];let r;for(;r=be.exec(t);)n.push(r[1]);if(!n.length)return t;const e="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(s=>{const i=typeof o=="function"?o(s):o+(Se++).toString(),c=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");t=t.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+i+e+"$3")}),t=t.replace(new RegExp(e,"g"),""),t}function Ie(t,o){let n=t.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const r in o)n+=" "+r+'="'+o[r]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+t+"</svg>"}function ke(t){return t.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function Ce(t){return"data:image/svg+xml,"+ke(t)}function Te(t){return'url("'+Ce(t)+'")'}const dt={...At,inline:!1},je={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},$e={display:"inline-block"},G={backgroundColor:"currentColor"},Ot={backgroundColor:"transparent"},pt={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},gt={webkitMask:G,mask:G,background:Ot};for(const t in gt){const o=gt[t];for(const n in pt)o[t+n]=pt[n]}const N={};["horizontal","vertical"].forEach(t=>{const o=t.slice(0,1)+"Flip";N[t+"-flip"]=o,N[t.slice(0,1)+"-flip"]=o,N[t+"Flip"]=o});function mt(t){return t+(t.match(/^[-0-9.]+$/)?"px":"")}const Fe=(t,o)=>{const n=fe(dt,o),r={...je},e=o.mode||"svg",s={},i=o.style,c=typeof i=="object"&&!(i instanceof Array)?i:{};for(let h in o){const f=o[h];if(f!==void 0)switch(h){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[h]=f===!0||f==="true"||f===1;break;case"flip":typeof f=="string"&&de(n,f);break;case"color":s.color=f;break;case"rotate":typeof f=="string"?n[h]=pe(f):typeof f=="number"&&(n[h]=f);break;case"ariaHidden":case"aria-hidden":f!==!0&&f!=="true"&&delete r["aria-hidden"];break;default:{const S=N[h];S?(f===!0||f==="true"||f===1)&&(n[S]=!0):dt[h]===void 0&&(r[h]=f)}}}const l=we(t,n),a=l.attributes;if(n.inline&&(s.verticalAlign="-0.125em"),e==="svg"){r.style={...s,...c},Object.assign(r,a);let h=0,f=o.id;return typeof f=="string"&&(f=f.replace(/-/g,"_")),r.innerHTML=ve(l.body,f?()=>f+"ID"+h++:"iconifyVue"),H("svg",r)}const{body:u,width:d,height:g}=t,b=e==="mask"||(e==="bg"?!1:u.indexOf("currentColor")!==-1),p=Ie(u,{...a,width:d+"",height:g+""});return r.style={...s,"--svg":Te(p),width:mt(a.width),height:mt(a.height),...$e,...b?G:Ot,...c},H("span",r)},Pe=Object.create(null),_e=et({inheritAttrs:!1,render(){const t=this.$attrs,o=t.icon,n=typeof o=="string"?Pe[o]:typeof o=="object"?o:null;return n===null||typeof n!="object"||typeof n.body!="string"?this.$slots.default?this.$slots.default():null:Fe({...nt,...n},t)}}),$=/^[a-z0-9]+(-[a-z0-9]+)*$/,_=(t,o,n,r="")=>{const e=t.split(":");if(t.slice(0,1)==="@"){if(e.length<2||e.length>3)return null;r=e.shift().slice(1)}if(e.length>3||!e.length)return null;if(e.length>1){const c=e.pop(),l=e.pop(),a={provider:e.length>0?e[0]:r,prefix:l,name:c};return o&&!z(a)?null:a}const s=e[0],i=s.split("-");if(i.length>1){const c={provider:r,prefix:i.shift(),name:i.join("-")};return o&&!z(c)?null:c}if(n&&r===""){const c={provider:r,prefix:"",name:s};return o&&!z(c,n)?null:c}return null},z=(t,o)=>t?!!((t.provider===""||t.provider.match($))&&(o&&t.prefix===""||t.prefix.match($))&&t.name.match($)):!1,Lt=Object.freeze({left:0,top:0,width:16,height:16}),B=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),M=Object.freeze({...Lt,...B}),K=Object.freeze({...M,body:"",hidden:!1});function Me(t,o){const n={};!t.hFlip!=!o.hFlip&&(n.hFlip=!0),!t.vFlip!=!o.vFlip&&(n.vFlip=!0);const r=((t.rotate||0)+(o.rotate||0))%4;return r&&(n.rotate=r),n}function yt(t,o){const n=Me(t,o);for(const r in K)r in B?r in t&&!(r in n)&&(n[r]=B[r]):r in o?n[r]=o[r]:r in t&&(n[r]=t[r]);return n}function Ee(t,o){const n=t.icons,r=t.aliases||Object.create(null),e=Object.create(null);function s(i){if(n[i])return e[i]=[];if(!(i in e)){e[i]=null;const c=r[i]&&r[i].parent,l=c&&s(c);l&&(e[i]=[c].concat(l))}return e[i]}return(o||Object.keys(n).concat(Object.keys(r))).forEach(s),e}function Ae(t,o,n){const r=t.icons,e=t.aliases||Object.create(null);let s={};function i(c){s=yt(r[c]||e[c],s)}return i(o),n.forEach(i),yt(t,s)}function Nt(t,o){const n=[];if(typeof t!="object"||typeof t.icons!="object")return n;t.not_found instanceof Array&&t.not_found.forEach(e=>{o(e,null),n.push(e)});const r=Ee(t);for(const e in r){const s=r[e];s&&(o(e,Ae(t,e,s)),n.push(e))}return n}const Oe={provider:"",aliases:{},not_found:{},...Lt};function q(t,o){for(const n in o)if(n in t&&typeof t[n]!=typeof o[n])return!1;return!0}function zt(t){if(typeof t!="object"||t===null)return null;const o=t;if(typeof o.prefix!="string"||!t.icons||typeof t.icons!="object"||!q(t,Oe))return null;const n=o.icons;for(const e in n){const s=n[e];if(!e.match($)||typeof s.body!="string"||!q(s,K))return null}const r=o.aliases||Object.create(null);for(const e in r){const s=r[e],i=s.parent;if(!e.match($)||typeof i!="string"||!n[i]&&!r[i]||!q(s,K))return null}return o}const wt=Object.create(null);function Le(t,o){return{provider:t,prefix:o,icons:Object.create(null),missing:new Set}}function k(t,o){const n=wt[t]||(wt[t]=Object.create(null));return n[o]||(n[o]=Le(t,o))}function ot(t,o){return zt(o)?Nt(o,(n,r)=>{r?t.icons[n]=r:t.missing.add(n)}):[]}function Ne(t,o,n){try{if(typeof n.body=="string")return t.icons[o]={...n},!0}catch{}return!1}let F=!1;function Dt(t){return typeof t=="boolean"&&(F=t),F}function Rt(t){const o=typeof t=="string"?_(t,!0,F):t;if(o){const n=k(o.provider,o.prefix),r=o.name;return n.icons[r]||(n.missing.has(r)?null:void 0)}}function ze(t,o){const n=_(t,!0,F);if(!n)return!1;const r=k(n.provider,n.prefix);return Ne(r,n.name,o)}function De(t,o){if(typeof t!="object")return!1;if(typeof o!="string"&&(o=t.provider||""),F&&!o&&!t.prefix){let e=!1;return zt(t)&&(t.prefix="",Nt(t,(s,i)=>{i&&ze(s,i)&&(e=!0)})),e}const n=t.prefix;if(!z({provider:o,prefix:n,name:"a"}))return!1;const r=k(o,n);return!!ot(r,t)}const Ht=Object.freeze({width:null,height:null}),Bt=Object.freeze({...Ht,...B}),Re=/(-?[0-9.]*[0-9]+[0-9.]*)/g,He=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function bt(t,o,n){if(o===1)return t;if(n=n||100,typeof t=="number")return Math.ceil(t*o*n)/n;if(typeof t!="string")return t;const r=t.split(Re);if(r===null||!r.length)return t;const e=[];let s=r.shift(),i=He.test(s);for(;;){if(i){const c=parseFloat(s);isNaN(c)?e.push(s):e.push(Math.ceil(c*o*n)/n)}else e.push(s);if(s=r.shift(),s===void 0)return e.join("");i=!i}}const Be=t=>t==="unset"||t==="undefined"||t==="none";function Ve(t,o){const n={...M,...t},r={...Bt,...o},e={left:n.left,top:n.top,width:n.width,height:n.height};let s=n.body;[n,r].forEach(p=>{const h=[],f=p.hFlip,S=p.vFlip;let w=p.rotate;f?S?w+=2:(h.push("translate("+(e.width+e.left).toString()+" "+(0-e.top).toString()+")"),h.push("scale(-1 1)"),e.top=e.left=0):S&&(h.push("translate("+(0-e.left).toString()+" "+(e.height+e.top).toString()+")"),h.push("scale(1 -1)"),e.top=e.left=0);let y;switch(w<0&&(w-=Math.floor(w/4)*4),w=w%4,w){case 1:y=e.height/2+e.top,h.unshift("rotate(90 "+y.toString()+" "+y.toString()+")");break;case 2:h.unshift("rotate(180 "+(e.width/2+e.left).toString()+" "+(e.height/2+e.top).toString()+")");break;case 3:y=e.width/2+e.left,h.unshift("rotate(-90 "+y.toString()+" "+y.toString()+")");break}w%2===1&&(e.left!==e.top&&(y=e.left,e.left=e.top,e.top=y),e.width!==e.height&&(y=e.width,e.width=e.height,e.height=y)),h.length&&(s='<g transform="'+h.join(" ")+'">'+s+"</g>")});const i=r.width,c=r.height,l=e.width,a=e.height;let u,d;i===null?(d=c===null?"1em":c==="auto"?a:c,u=bt(d,l/a)):(u=i==="auto"?l:i,d=c===null?bt(u,a/l):c==="auto"?a:c);const g={},b=(p,h)=>{Be(h)||(g[p]=h.toString())};return b("width",u),b("height",d),g.viewBox=e.left.toString()+" "+e.top.toString()+" "+l.toString()+" "+a.toString(),{attributes:g,body:s}}const Ue=/\sid="(\S+)"/g,qe="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let Qe=0;function Ge(t,o=qe){const n=[];let r;for(;r=Ue.exec(t);)n.push(r[1]);if(!n.length)return t;const e="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(s=>{const i=typeof o=="function"?o(s):o+(Qe++).toString(),c=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");t=t.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+i+e+"$3")}),t=t.replace(new RegExp(e,"g"),""),t}const W=Object.create(null);function Ke(t,o){W[t]=o}function J(t){return W[t]||W[""]}function rt(t){let o;if(typeof t.resources=="string")o=[t.resources];else if(o=t.resources,!(o instanceof Array)||!o.length)return null;return{resources:o,path:t.path||"/",maxURL:t.maxURL||500,rotate:t.rotate||750,timeout:t.timeout||5e3,random:t.random===!0,index:t.index||0,dataAfterTimeout:t.dataAfterTimeout!==!1}}const st=Object.create(null),j=["https://api.simplesvg.com","https://api.unisvg.com"],D=[];for(;j.length>0;)j.length===1||Math.random()>.5?D.push(j.shift()):D.push(j.pop());st[""]=rt({resources:["https://api.iconify.design"].concat(D)});function We(t,o){const n=rt(o);return n===null?!1:(st[t]=n,!0)}function it(t){return st[t]}const Je=()=>{let t;try{if(t=fetch,typeof t=="function")return t}catch{}};let xt=Je();function Xe(t,o){const n=it(t);if(!n)return 0;let r;if(!n.maxURL)r=0;else{let e=0;n.resources.forEach(i=>{e=Math.max(e,i.length)});const s=o+".json?icons=";r=n.maxURL-e-n.path.length-s.length}return r}function Ye(t){return t===404}const Ze=(t,o,n)=>{const r=[],e=Xe(t,o),s="icons";let i={type:s,provider:t,prefix:o,icons:[]},c=0;return n.forEach((l,a)=>{c+=l.length+1,c>=e&&a>0&&(r.push(i),i={type:s,provider:t,prefix:o,icons:[]},c=l.length),i.icons.push(l)}),r.push(i),r};function tn(t){if(typeof t=="string"){const o=it(t);if(o)return o.path}return"/"}const en=(t,o,n)=>{if(!xt){n("abort",424);return}let r=tn(o.provider);switch(o.type){case"icons":{const s=o.prefix,c=o.icons.join(","),l=new URLSearchParams({icons:c});r+=s+".json?"+l.toString();break}case"custom":{const s=o.uri;r+=s.slice(0,1)==="/"?s.slice(1):s;break}default:n("abort",400);return}let e=503;xt(t+r).then(s=>{const i=s.status;if(i!==200){setTimeout(()=>{n(Ye(i)?"abort":"next",i)});return}return e=501,s.json()}).then(s=>{if(typeof s!="object"||s===null){setTimeout(()=>{s===404?n("abort",s):n("next",e)});return}setTimeout(()=>{n("success",s)})}).catch(()=>{n("next",e)})},nn={prepare:Ze,send:en};function on(t){const o={loaded:[],missing:[],pending:[]},n=Object.create(null);t.sort((e,s)=>e.provider!==s.provider?e.provider.localeCompare(s.provider):e.prefix!==s.prefix?e.prefix.localeCompare(s.prefix):e.name.localeCompare(s.name));let r={provider:"",prefix:"",name:""};return t.forEach(e=>{if(r.name===e.name&&r.prefix===e.prefix&&r.provider===e.provider)return;r=e;const s=e.provider,i=e.prefix,c=e.name,l=n[s]||(n[s]=Object.create(null)),a=l[i]||(l[i]=k(s,i));let u;c in a.icons?u=o.loaded:i===""||a.missing.has(c)?u=o.missing:u=o.pending;const d={provider:s,prefix:i,name:c};u.push(d)}),o}function Vt(t,o){t.forEach(n=>{const r=n.loaderCallbacks;r&&(n.loaderCallbacks=r.filter(e=>e.id!==o))})}function rn(t){t.pendingCallbacksFlag||(t.pendingCallbacksFlag=!0,setTimeout(()=>{t.pendingCallbacksFlag=!1;const o=t.loaderCallbacks?t.loaderCallbacks.slice(0):[];if(!o.length)return;let n=!1;const r=t.provider,e=t.prefix;o.forEach(s=>{const i=s.icons,c=i.pending.length;i.pending=i.pending.filter(l=>{if(l.prefix!==e)return!0;const a=l.name;if(t.icons[a])i.loaded.push({provider:r,prefix:e,name:a});else if(t.missing.has(a))i.missing.push({provider:r,prefix:e,name:a});else return n=!0,!0;return!1}),i.pending.length!==c&&(n||Vt([t],s.id),s.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),s.abort))})}))}let sn=0;function cn(t,o,n){const r=sn++,e=Vt.bind(null,n,r);if(!o.pending.length)return e;const s={id:r,icons:o,callback:t,abort:e};return n.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(s)}),e}function ln(t,o=!0,n=!1){const r=[];return t.forEach(e=>{const s=typeof e=="string"?_(e,o,n):e;s&&r.push(s)}),r}var an={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function un(t,o,n,r){const e=t.resources.length,s=t.random?Math.floor(Math.random()*e):t.index;let i;if(t.random){let m=t.resources.slice(0);for(i=[];m.length>1;){const v=Math.floor(Math.random()*m.length);i.push(m[v]),m=m.slice(0,v).concat(m.slice(v+1))}i=i.concat(m)}else i=t.resources.slice(s).concat(t.resources.slice(0,s));const c=Date.now();let l="pending",a=0,u,d=null,g=[],b=[];typeof r=="function"&&b.push(r);function p(){d&&(clearTimeout(d),d=null)}function h(){l==="pending"&&(l="aborted"),p(),g.forEach(m=>{m.status==="pending"&&(m.status="aborted")}),g=[]}function f(m,v){v&&(b=[]),typeof m=="function"&&b.push(m)}function S(){return{startTime:c,payload:o,status:l,queriesSent:a,queriesPending:g.length,subscribe:f,abort:h}}function w(){l="failed",b.forEach(m=>{m(void 0,u)})}function y(){g.forEach(m=>{m.status==="pending"&&(m.status="aborted")}),g=[]}function Zt(m,v,C){const E=v!=="success";switch(g=g.filter(I=>I!==m),l){case"pending":break;case"failed":if(E||!t.dataAfterTimeout)return;break;default:return}if(v==="abort"){u=C,w();return}if(E){u=C,g.length||(i.length?U():w());return}if(p(),y(),!t.random){const I=t.resources.indexOf(m.resource);I!==-1&&I!==t.index&&(t.index=I)}l="completed",b.forEach(I=>{I(C)})}function U(){if(l!=="pending")return;p();const m=i.shift();if(m===void 0){if(g.length){d=setTimeout(()=>{p(),l==="pending"&&(y(),w())},t.timeout);return}w();return}const v={status:"pending",resource:m,callback:(C,E)=>{Zt(v,C,E)}};g.push(v),a++,d=setTimeout(U,t.rotate),n(m,o,v.callback)}return setTimeout(U),S}function Ut(t){const o={...an,...t};let n=[];function r(){n=n.filter(c=>c().status==="pending")}function e(c,l,a){const u=un(o,c,l,(d,g)=>{r(),a&&a(d,g)});return n.push(u),u}function s(c){return n.find(l=>c(l))||null}return{query:e,find:s,setIndex:c=>{o.index=c},getIndex:()=>o.index,cleanup:r}}function St(){}const Q=Object.create(null);function fn(t){if(!Q[t]){const o=it(t);if(!o)return;const n=Ut(o),r={config:o,redundancy:n};Q[t]=r}return Q[t]}function hn(t,o,n){let r,e;if(typeof t=="string"){const s=J(t);if(!s)return n(void 0,424),St;e=s.send;const i=fn(t);i&&(r=i.redundancy)}else{const s=rt(t);if(s){r=Ut(s);const i=t.resources?t.resources[0]:"",c=J(i);c&&(e=c.send)}}return!r||!e?(n(void 0,424),St):r.query(o,e,n)().abort}const vt="iconify2",P="iconify",qt=P+"-count",It=P+"-version",Qt=36e5,dn=168;function X(t,o){try{return t.getItem(o)}catch{}}function ct(t,o,n){try{return t.setItem(o,n),!0}catch{}}function kt(t,o){try{t.removeItem(o)}catch{}}function Y(t,o){return ct(t,qt,o.toString())}function Z(t){return parseInt(X(t,qt))||0}const V={local:!0,session:!0},Gt={local:new Set,session:new Set};let lt=!1;function pn(t){lt=t}let L=typeof window>"u"?{}:window;function Kt(t){const o=t+"Storage";try{if(L&&L[o]&&typeof L[o].length=="number")return L[o]}catch{}V[t]=!1}function Wt(t,o){const n=Kt(t);if(!n)return;const r=X(n,It);if(r!==vt){if(r){const c=Z(n);for(let l=0;l<c;l++)kt(n,P+l.toString())}ct(n,It,vt),Y(n,0);return}const e=Math.floor(Date.now()/Qt)-dn,s=c=>{const l=P+c.toString(),a=X(n,l);if(typeof a=="string"){try{const u=JSON.parse(a);if(typeof u=="object"&&typeof u.cached=="number"&&u.cached>e&&typeof u.provider=="string"&&typeof u.data=="object"&&typeof u.data.prefix=="string"&&o(u,c))return!0}catch{}kt(n,l)}};let i=Z(n);for(let c=i-1;c>=0;c--)s(c)||(c===i-1?(i--,Y(n,i)):Gt[t].add(c))}function Jt(){if(!lt){pn(!0);for(const t in V)Wt(t,o=>{const n=o.data,r=o.provider,e=n.prefix,s=k(r,e);if(!ot(s,n).length)return!1;const i=n.lastModified||-1;return s.lastModifiedCached=s.lastModifiedCached?Math.min(s.lastModifiedCached,i):i,!0})}}function gn(t,o){const n=t.lastModifiedCached;if(n&&n>=o)return n===o;if(t.lastModifiedCached=o,n)for(const r in V)Wt(r,e=>{const s=e.data;return e.provider!==t.provider||s.prefix!==t.prefix||s.lastModified===o});return!0}function mn(t,o){lt||Jt();function n(r){let e;if(!V[r]||!(e=Kt(r)))return;const s=Gt[r];let i;if(s.size)s.delete(i=Array.from(s).shift());else if(i=Z(e),!Y(e,i+1))return;const c={cached:Math.floor(Date.now()/Qt),provider:t.provider,data:o};return ct(e,P+i.toString(),JSON.stringify(c))}o.lastModified&&!gn(t,o.lastModified)||Object.keys(o.icons).length&&(o.not_found&&(o=Object.assign({},o),delete o.not_found),n("local")||n("session"))}function Ct(){}function yn(t){t.iconsLoaderFlag||(t.iconsLoaderFlag=!0,setTimeout(()=>{t.iconsLoaderFlag=!1,rn(t)}))}function wn(t,o){t.iconsToLoad?t.iconsToLoad=t.iconsToLoad.concat(o).sort():t.iconsToLoad=o,t.iconsQueueFlag||(t.iconsQueueFlag=!0,setTimeout(()=>{t.iconsQueueFlag=!1;const{provider:n,prefix:r}=t,e=t.iconsToLoad;delete t.iconsToLoad;let s;if(!e||!(s=J(n)))return;s.prepare(n,r,e).forEach(c=>{hn(n,c,l=>{if(typeof l!="object")c.icons.forEach(a=>{t.missing.add(a)});else try{const a=ot(t,l);if(!a.length)return;const u=t.pendingIcons;u&&a.forEach(d=>{u.delete(d)}),mn(t,l)}catch(a){console.error(a)}yn(t)})})}))}const Xt=(t,o)=>{const n=ln(t,!0,Dt()),r=on(n);if(!r.pending.length){let l=!0;return o&&setTimeout(()=>{l&&o(r.loaded,r.missing,r.pending,Ct)}),()=>{l=!1}}const e=Object.create(null),s=[];let i,c;return r.pending.forEach(l=>{const{provider:a,prefix:u}=l;if(u===c&&a===i)return;i=a,c=u,s.push(k(a,u));const d=e[a]||(e[a]=Object.create(null));d[u]||(d[u]=[])}),r.pending.forEach(l=>{const{provider:a,prefix:u,name:d}=l,g=k(a,u),b=g.pendingIcons||(g.pendingIcons=new Set);b.has(d)||(b.add(d),e[a][u].push(d))}),s.forEach(l=>{const{provider:a,prefix:u}=l;e[a][u].length&&wn(l,e[a][u])}),o?cn(o,r,s):Ct},bn=t=>new Promise((o,n)=>{const r=typeof t=="string"?_(t,!0):t;if(!r){n(t);return}Xt([r||t],e=>{if(e.length&&r){const s=Rt(r);if(s){o({...M,...s});return}}n(t)})});function xn(t,o){const n={...t};for(const r in o){const e=o[r],s=typeof e;r in Ht?(e===null||e&&(s==="string"||s==="number"))&&(n[r]=e):s===typeof n[r]&&(n[r]=r==="rotate"?e%4:e)}return n}const Sn=/[\s,]+/;function vn(t,o){o.split(Sn).forEach(n=>{switch(n.trim()){case"horizontal":t.hFlip=!0;break;case"vertical":t.vFlip=!0;break}})}function In(t,o=0){const n=t.replace(/^-?[0-9.]*/,"");function r(e){for(;e<0;)e+=4;return e%4}if(n===""){const e=parseInt(t);return isNaN(e)?0:r(e)}else if(n!==t){let e=0;switch(n){case"%":e=25;break;case"deg":e=90}if(e){let s=parseFloat(t.slice(0,t.length-n.length));return isNaN(s)?0:(s=s/e,s%1===0?r(s):0)}}return o}function kn(t,o){let n=t.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const r in o)n+=" "+r+'="'+o[r]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+t+"</svg>"}function Cn(t){return t.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function Tn(t){return"data:image/svg+xml,"+Cn(t)}function jn(t){return'url("'+Tn(t)+'")'}const Tt={...Bt,inline:!1},$n={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},Fn={display:"inline-block"},tt={backgroundColor:"currentColor"},Yt={backgroundColor:"transparent"},jt={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},$t={webkitMask:tt,mask:tt,background:Yt};for(const t in $t){const o=$t[t];for(const n in jt)o[t+n]=jt[n]}const R={};["horizontal","vertical"].forEach(t=>{const o=t.slice(0,1)+"Flip";R[t+"-flip"]=o,R[t.slice(0,1)+"-flip"]=o,R[t+"Flip"]=o});function Ft(t){return t+(t.match(/^[-0-9.]+$/)?"px":"")}const Pt=(t,o)=>{const n=xn(Tt,o),r={...$n},e=o.mode||"svg",s={},i=o.style,c=typeof i=="object"&&!(i instanceof Array)?i:{};for(let h in o){const f=o[h];if(f!==void 0)switch(h){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[h]=f===!0||f==="true"||f===1;break;case"flip":typeof f=="string"&&vn(n,f);break;case"color":s.color=f;break;case"rotate":typeof f=="string"?n[h]=In(f):typeof f=="number"&&(n[h]=f);break;case"ariaHidden":case"aria-hidden":f!==!0&&f!=="true"&&delete r["aria-hidden"];break;default:{const S=R[h];S?(f===!0||f==="true"||f===1)&&(n[S]=!0):Tt[h]===void 0&&(r[h]=f)}}}const l=Ve(t,n),a=l.attributes;if(n.inline&&(s.verticalAlign="-0.125em"),e==="svg"){r.style={...s,...c},Object.assign(r,a);let h=0,f=o.id;return typeof f=="string"&&(f=f.replace(/-/g,"_")),r.innerHTML=Ge(l.body,f?()=>f+"ID"+h++:"iconifyVue"),H("svg",r)}const{body:u,width:d,height:g}=t,b=e==="mask"||(e==="bg"?!1:u.indexOf("currentColor")!==-1),p=kn(u,{...a,width:d+"",height:g+""});return r.style={...s,"--svg":jn(p),width:Ft(a.width),height:Ft(a.height),...Fn,...b?tt:Yt,...c},H("span",r)};Dt(!0);Ke("",nn);if(typeof document<"u"&&typeof window<"u"){Jt();const t=window;if(t.IconifyPreload!==void 0){const o=t.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof o=="object"&&o!==null&&(o instanceof Array?o:[o]).forEach(r=>{try{(typeof r!="object"||r===null||r instanceof Array||typeof r.icons!="object"||typeof r.prefix!="string"||!De(r))&&console.error(n)}catch{console.error(n)}})}if(t.IconifyProviders!==void 0){const o=t.IconifyProviders;if(typeof o=="object"&&o!==null)for(let n in o){const r="IconifyProviders["+n+"] is invalid.";try{const e=o[n];if(typeof e!="object"||!e||e.resources===void 0)continue;We(n,e)||console.error(r)}catch{console.error(r)}}}}const Pn={...M,body:""};et({inheritAttrs:!1,data(){return{iconMounted:!1,counter:0}},mounted(){this._name="",this._loadingIcon=null,this.iconMounted=!0},unmounted(){this.abortLoading()},methods:{abortLoading(){this._loadingIcon&&(this._loadingIcon.abort(),this._loadingIcon=null)},getIcon(t,o){if(typeof t=="object"&&t!==null&&typeof t.body=="string")return this._name="",this.abortLoading(),{data:t};let n;if(typeof t!="string"||(n=_(t,!1,!0))===null)return this.abortLoading(),null;const r=Rt(n);if(!r)return(!this._loadingIcon||this._loadingIcon.name!==t)&&(this.abortLoading(),this._name="",r!==null&&(this._loadingIcon={name:t,abort:Xt([n],()=>{this.counter++})})),null;this.abortLoading(),this._name!==t&&(this._name=t,o&&o(t));const e=["iconify"];return n.prefix!==""&&e.push("iconify--"+n.prefix),n.provider!==""&&e.push("iconify--"+n.provider),{data:r,classes:e}}},render(){this.counter;const t=this.$attrs,o=this.iconMounted?this.getIcon(t.icon,t.onLoad):null;if(!o)return Pt(Pn,t);let n=t;return o.classes&&(n={...t,class:(typeof t.class=="string"?t.class+" ":"")+o.classes.join(" ")}),Pt({...M,...o.data},n)}});const _n=et({__name:"Icon",props:{name:{type:String,required:!0},size:{type:String,default:""}},async setup(t){let o,n;const r=t,e=te(),s=ue(),i=ee("icons",()=>({})),c=ne(!1),l=T(()=>{var p;return((((p=s.nuxtIcon)==null?void 0:p.aliases)||{})[r.name]||r.name).replace(/^i-/,"")}),a=T(()=>{var p;return(p=i.value)==null?void 0:p[l.value]}),u=T(()=>e.vueApp.component(l.value)),d=T(()=>{var h,f,S;if(!r.size&&typeof((h=s.nuxtIcon)==null?void 0:h.size)=="boolean"&&!((f=s.nuxtIcon)!=null&&f.size))return;const p=r.size||((S=s.nuxtIcon)==null?void 0:S.size)||"1em";return String(Number(p))===p?`${p}px`:p}),g=T(()=>{var p;return((p=s==null?void 0:s.nuxtIcon)==null?void 0:p.class)??"icon"});async function b(){var p;u.value||(p=i.value)!=null&&p[l.value]||(c.value=!0,i.value[l.value]=await bn(l.value).catch(()=>{}),c.value=!1)}return oe(()=>l.value,b),!u.value&&([o,n]=re(()=>b()),o=await o,n()),(p,h)=>c.value?(A(),at("span",{key:0,class:O(x(g)),style:ut({width:x(d),height:x(d)})},null,6)):x(a)?(A(),ft(x(_e),{key:1,icon:x(a),class:O(x(g)),width:x(d),height:x(d)},null,8,["icon","class","width","height"])):x(u)?(A(),ft(se(x(u)),{key:2,class:O(x(g)),width:x(d),height:x(d)},null,8,["class","width","height"])):(A(),at("span",{key:3,class:O(x(g)),style:ut({fontSize:x(d),lineHeight:x(d),width:x(d),height:x(d)})},[ie(p.$slots,"default",{},()=>[ce(le(t.name),1)],!0)],6))}});const An=ae(_n,[["__scopeId","data-v-9c34c54e"]]);export{An as default};