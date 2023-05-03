<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import Navbar from "~/components/navbar.vue";
useHead({ title: "Календарь занятий" });

const date = ref(new Date());
const attrs = ref<Event[]>([]);
const subjectsArr: Subject[] = JSON.parse(localStorage.getItem('subjectsJSON') || "");
const todaysList = ref<displaySubject[]>([]);
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
    dateStr: string;
    dates: string[];
    time: number;
}

interface displaySubject {
    groups: string;
    name: string;
    type: string;
    location: string;
    date: string;
    time: string;
}

const timeMap = new Map([
    [0, "8:30 - 10:10"],
    [1, "10:20 - 12:00"],
    [2, "12:20 - 14:00"],
    [3, "14:10 - 15:50"],
    [4, "16:00 - 17:40"],
    [5, "18:00 - 19:30"],
    [6, "19:40 - 21:10"],
    [7, "21:20 - 22:50"],
    [8, "8:30 - 12:00"],
    [9, "10:20 - 14:00"],
    [10, "12:20 - 15:50"],
    [11, "14:10 - 17:40"],
    [12, "16:00 - 19:30"],
    [13, "18:00 - 21:10"],
    [14, "19:40 - 22:50"],
    [15, "21:20 - 1:00"]
])

onMounted(async ()=>{
    populateCalendar();
});

function populateCalendar() {
    let eventArray: Event[] = [];
    // eventArray.push({ key: 'today', highlight: 'red', dates: new Date("2023-05-25 23:59") });
    
    for (let i = 0; i < subjectsArr.length; i++) {
        let color = "blue";

        switch(subjectsArr[i].type) {
            case 'Лекции':
                color = "green";
                break;
            case 'Cеминары':
                color = "blue";
                break;
            case 'Лабораторные занятия':
                color = "yellow";
                break;
        }

        for (let j = 0; j < subjectsArr[i].dates.length; j++) {     
            eventArray.push({ key: i.toString() + j.toString(), dot: color, dates: new Date(subjectsArr[i].dates[j]) });
        }
    }

    // console.log(eventArray);
    attrs.value = eventArray;
    getToday();
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
            if (searchDay.toLocaleDateString() === indexedDay.toLocaleDateString()) {
                const time: string = subjectsArr[i].type === "Лабораторные занятия" ? timeMap.get(subjectsArr[i].time + 8) : timeMap.get(subjectsArr[i].time);
                todaysList.value.push({
                    groups: subjectsArr[i].groups.join(", ") + " " + subjectsArr[i].subgroup,
                    name: subjectsArr[i].name,
                    type: subjectsArr[i].type.replace("Лекции", "Лекция").replace("Cеминары", "Cеминар").replace("Лабораторные занятия", "Лабораторное занятие"),
                    location: subjectsArr[i].location,
                    date: subjectsArr[i].dates[j],
                    time: time
                });
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
                <div class="overflow-auto h-[40vh] w-full scrollbar mt-3">
                    <div v-for="(item, i) in todaysList" class="w-full bg-[#764462] rounded-lg mb-3 p-3 overflow-hidden">
                        <p class="text-sm text-[#C69787] inline">{{ item.groups }}</p>
                        <p class="font-medium italic">{{ item.name }}</p>
                        <p class="text-sm"
                        :class="{ 'text-[#8CC487]': item.type.includes('Лекция'),
                        'text-[#9b8fcf]': item.type.includes('Cеминар'),
                        'text-[#ccc46f]': item.type.includes('Лабораторное занятие') }">{{ item.type }}</p>
                        <p class="text-sm text-[#C69787] inline">{{ item.time }}</p>
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