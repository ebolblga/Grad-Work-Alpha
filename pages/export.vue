<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
useHead({ title: "Экспортировать расписание" });

const subjectsArr: Subject[] = JSON.parse(localStorage.getItem('subjectsJSON') || "");

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

// Downloads subject data in ICS file format
function exportICS() {

}

// Downloads subject data in CSV file format
function exportCSV() {
    const dataStr = [
        [
            "Группа или преподователь",
            "Подгруппа",
            "Предмет",
            "Тип занятия",
            "Кабинет",
            "Время",
            "Строка дат",
            "Даты"
        ],
        ...subjectsArr.map(item => [
            item.groups.join(', '),
            item.subgroup,
            item.name,
            item.type,
            item.location,
            item.time,
            item.dateStr,
            item.dates.join(' ')
        ])
    ].map(e => e.join(",")).join("\n");
    // console.log(dataStr)

    const blob = new Blob([dataStr], { type: 'text/csv;charset=UTF-8' });
  
    const url = window.URL.createObjectURL(blob)
  
    const a = document.createElement('a')

    a.setAttribute('href', url)
  
    a.setAttribute('download', 'schedule.csv');
  
    a.click()
}

// Downloads subject data in JSON file format
function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(subjectsArr, null, "\t"));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "schedule.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[40%] flex flex-col my-auto min-w-[360px]">
                <my-button @click="exportICS()" class="mb-7 w-full">Экспортировать ICS</my-button>
                <my-button @click="exportCSV()" class="mb-7 w-full">Экспортировать CSV</my-button>
                <my-button @click="exportJSON()" class="mb-7 w-full">Экспортировать JSON</my-button>
            </div>
        </div>
        <Navbar />
    </div>
</template>