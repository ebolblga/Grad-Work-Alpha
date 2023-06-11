<script setup lang="ts">
const {public:{base}} = useRuntimeConfig()
useHead({
  link: [
    {
      rel: "icon",
      href: `${base}favicon.ico`,
      type: "image/x-icon",
      id: "favicon"
    }
  ],
  htmlAttrs: {
      lang: 'ru'
    },
  meta: [
    { name: 'STANKIN Schedule Manager', content: 'Author: ebolblga, Calendar app' }
  ],
});
const epilepsyToggle = ref(localStorage.getItem('epilepsyToggle') === "true" || false);
const visuallyImpairedToggle = ref(localStorage.getItem('visuallyImpairedToggle') === "true" || false);
const dyslexiaToggle = ref(localStorage.getItem('dyslexiaToggle') === "true" || false);
const adhdToggle = ref(localStorage.getItem('adhdToggle') === "true" || false);

const fontMultiplier = ref(Number(localStorage.getItem('fontMultiplier')) || 1);
let selectedFont: string = dyslexiaToggle.value ? "OpenDyslexic" : "Montserrat";
let saturation = "saturate(100%)";
if (visuallyImpairedToggle.value === true) {
  saturation = "saturate(150%)";
}

if (epilepsyToggle.value === true) {
  saturation = "saturate(50%)";
}

if (adhdToggle.value === true) {
  saturation = "saturate(50%)";
}

let fontSize12 = (12 * fontMultiplier.value).toString() + "px";
let fontSize14 = (14 * fontMultiplier.value).toString() + "px";
let fontSize16 = (16 * fontMultiplier.value).toString() + "px";
let fontSize18 = (18 * fontMultiplier.value).toString() + "px";
</script>

<template>
    <div class="h-screen" :style="{fontFamily: selectedFont, 'font-size': fontSize16, 'filter': saturation}">
      <slot />
    </div>
</template>

<style>
body {
    margin: 0;
    background: #2C2137;
    font-size: 16px;
    color: #EDB4A1;
    font-family: "Montserrat";
}

@font-face {
  font-family: 'OpenDyslexic';
  src: url('/OpenDyslexic-Regular.otf');
  font-family: 'Montserrat';
  src: url('/Montserrat-Regular.ttf');
}

.scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar::-webkit-scrollbar-track {
  box-shadow: transparent;
}
 
.scrollbar::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  border-radius: 4px;
}

.scrollbar::-webkit-scrollbar-corner {
    background: transparent;
}

.text-lg {
    font-size: v-bind(fontSize18);
    line-height: 1.75rem/* 28px */;
}

.text-sm {
    font-size: v-bind(fontSize14);
    line-height: 1.25rem/* 20px */;
}

.text-xs {
    font-size: v-bind(fontSize12);
    line-height: 1rem/* 16px */;
}
</style>