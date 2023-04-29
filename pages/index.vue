<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
useHead({ title: "Сканирование" });
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[40%] flex flex-col my-auto">
                <NuxtLink to="/scanPDF"><my-button class="mb-7 w-full">Считать из PDF</my-button></NuxtLink>
                <NuxtLink to="/scan"><my-button class="mb-7 w-full">Сканировать изображение</my-button></NuxtLink>
                <NuxtLink to="/"><my-button class="mb-7 w-full">Скачать из облака</my-button></NuxtLink>
            </div>
        </div>
        <Navbar />
    </div>
</template>