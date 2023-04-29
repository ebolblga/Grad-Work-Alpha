<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
useHead({ title: "Экспортировать расписание" });
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[40%] flex flex-col my-auto">
                <my-button class="mb-7 w-full">Экспортировать ICS</my-button>
            </div>
        </div>
        <Navbar />
    </div>
</template>