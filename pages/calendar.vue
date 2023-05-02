<script setup lang="ts">
import { DFT_ROWS } from '@techstark/opencv-js';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import Navbar from "~/components/navbar.vue";
useHead({ title: "Календарь занятий" });

const date = ref(new Date());
const attrs = ref<Event[]>([]);
const subjectsArr: Subject[] = JSON.parse(localStorage.getItem('subjectsJSON') || "");
const todaysList = ref<Subject[]>([]);
interface Event {
    key: string;
    dot: string;
    dates: Date;
}

interface Subject {
    groups: string[];
    name: string;
    type: string;
    subgroup: string;
    location: string;
    dates: string[];
    time: number;
}

const timeMap = new Map([
    [1, "8:30 - 10:10"],
    [2, "10:20 - 12:00"],
    [3, "12:20 - 14:00"],
    [4, "14:10 - 15:50"],
    [5, "16:00 - 17:40"],
    [6, "18:00 - 19:30"],
    [7, "19:40 - 21:10"],
    [8, "21:20 - 22:50"],
])

onMounted(async ()=>{
    populateCalendar();
});

function populateCalendar() {
    let eventArray: Event[] = [];
    // eventArray.push({ key: 'today', highlight: 'red', dates: new Date("2023-05-25 23:59") });
    
    for (let i = 0; i < subjectsArr.length; i++) {
        let color = "green";
        if (subjectsArr[i].type === "семинар") {
            color = "blue";
        } else if (subjectsArr[i].type === "лабораторные занятия") {
            color = "yellow";
        }

        for (let j = 0; j < subjectsArr[i].dates.length; j++) {
            eventArray.push({ key: (i * j + j).toString(), dot: color, dates: new Date(subjectsArr[i].dates[j]) });
        }
    }

    // console.log(eventArray);
    attrs.value = eventArray;
}

function getToday() {
    todaysList.value = [];
    let searchDay = new Date();
    if (date.value) {
        searchDay = date.value;
    }

    for (let i = 0; i < subjectsArr.length; i++) {
        for (let j = 0; j < subjectsArr[i].dates.length; j++) {
            const indexedDay = new Date(subjectsArr[i].dates[j]);
            if (searchDay.getDate() === indexedDay.getDate() && searchDay.getMonth() === indexedDay.getMonth()) {
                todaysList.value.push(subjectsArr[i]);
            }
        }
    }

    // todaysList.value.sort((a, b) => a.time - b.time);
}
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[75vw] max-w-[480px] flex flex-col my-auto">
                <DatePicker :attributes="attrs" expanded :first-day-of-week="2" :color="'orange'" locale="ru" is-dark borderless v-model="date" @click="getToday()" title-position="left" class="rounded-lg" />
                <!-- <p>Date: {{  date }}</p>
                <my-button @click="populateCalendar">Populate</my-button> -->
                <div class="overflow-auto h-[40vh] w-full scrollbar mt-3">
                    <div v-for="(item, i) in todaysList" class="w-full bg-[#764462] rounded-lg mb-3 p-3 overflow-hidden">
                        <p class="text-sm text-[#C69787] inline">{{ item.groups.join(", ") }}</p>
                        <p class="text-sm text-[#C69787] inline">{{ ' ' + item.subgroup }}</p>
                        <p class="font-medium italic">{{ item.name }}</p>
                        <p class="text-sm"
                        :class="{ 'text-[#8CC487]': item.type.includes('лекции'),
                        'text-[#9b8fcf]': item.type.includes('семинар'),
                        'text-[#ccc46f]': item.type.includes('лабораторные занятия') }">{{ item.type }}</p>
                        <p class="text-sm text-[#C69787] inline">{{ timeMap.get(item.time) }}</p>
                        <!-- <p class="text-sm text-[#C69787] inline">{{ ' ' + item.dates.join(", ") }}</p> -->
                        <p class="text-sm text-right text-[#C69787]">{{ item.location }}</p>
                    </div>
                </div>
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