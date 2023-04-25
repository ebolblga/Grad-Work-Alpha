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
    { name: 'description', content: 'Author: ebolblga, Calendar app' }
  ],
});
</script>

<template>
    <div class="h-screen">
      <slot />
    </div>
</template>

<style>
body {
    margin: 0;
    background: #ECDAC1;
    font-size: 16px;
    color: #543F40;
    font-family: Montserrat;
}

/* @font-face {
  font-family: 'Montserrat';
  src: url('/tf2build.ttf');
} */
</style>