<script setup lang="ts">
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import Navbar from "~/components/navbar.vue";
useHead({ title: "Календарь занятий" });

const date = ref(new Date());
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[75vw] flex flex-col my-auto">
                <DatePicker expanded :first-day-of-week="2" locale="ru" is-dark borderless v-model="date" title-position="left" class="rounded-lg"/>
                <p>Date: {{  date.toJSON() }}</p>
            </div>
        </div>
        <Navbar />
    </div>
</template>
<style>
@use base;
@use container;

.vc-container {
    background-color: #764462;
}
</style>