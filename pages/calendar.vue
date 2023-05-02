<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import Navbar from "~/components/navbar.vue";
useHead({ title: "Календарь занятий" });

const date = ref(new Date());
const attrs = ref<Event[]>([]);
interface Event {
    key: string;
    dot: string;
    dates: Date;
}

function populateCalendar() {
    let eventArray: Event[] = [];
    eventArray.push({ key: '0', dot: 'red', dates: new Date("2023-05-25 23:59") });
    eventArray.push({ key: '1', dot: 'blue', dates: new Date("2023-05-25 23:59") });
    eventArray.push({ key: '2', dot: 'green', dates: new Date("2023-05-25 23:59") });
    console.log(eventArray);
    attrs.value = eventArray;
}
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[75vw] max-w-[480px] flex flex-col my-auto">
                <DatePicker :attributes="attrs" expanded :first-day-of-week="2" :color="'orange'" locale="ru" is-dark borderless v-model="date" title-position="left" class="rounded-lg" />
                <p>Date: {{  date }}</p>
                <my-button @click="populateCalendar">Populate</my-button>
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

.vc-container .vc-weekday {
    color:#EDB4A1;
}

.vc-container .vc-weekday-1 {
    color:#fc7676;
}
</style>