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

const dyslexiaToggle = ref(localStorage.getItem('dyslexiaToggle') === "true" || false);
const fontMultiplier = ref(Number(localStorage.getItem('fontMultiplier')) || 1);
let selectedFont: string = dyslexiaToggle.value ? "OpenDyslexic" : "Montserrat";
let fontSize = (16 * fontMultiplier.value).toString() + "px";
</script>

<template>
    <div class="h-screen" :style="{fontFamily: selectedFont, 'font-size': fontSize}">
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
</style>