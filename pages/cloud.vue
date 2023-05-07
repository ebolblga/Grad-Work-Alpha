<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
useHead({ title: "Привет!" });
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[40%] flex flex-col my-auto min-w-[360px] text-center">
                <p class="font-bold text-4xl mb-8">Качай сам.</p>
                <a href="https://cloud.mail.ru/public/oZk5/1hFCsQMdP" target="_blank"><my-button class="mb-8 w-full">Расписание преподавателей</my-button></a>
                <a href="https://edu.stankin.ru/course/view.php?id=11557" target="_blank"><my-button class="w-full">Расписание студентов</my-button></a>
                <img src="/stankin-logo.svg" class="mx-auto"/>
            </div>
        </div>
        <Navbar />
    </div>
</template>