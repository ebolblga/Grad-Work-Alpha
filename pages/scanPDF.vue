<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
useHead({ title: "Сканировать из PDF" });

function pdfUploaded(event: Event) {

}
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <input aria-label="Input for images to process"
                class="h-7 block w-full text-sm text-gray-400 rounded-lg cursor-pointer focus:outline-none bg-[#764462] placeholder-gray-400"
                type="file" accept=".pdf" @change="pdfUploaded($event)" />
        </div>
        <Navbar />
    </div>
</template>