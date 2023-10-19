<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
useHead({ title: "Экспортировать расписание" });

const subjectsArr: Subject[] = JSON.parse(localStorage.getItem('subjectsJSON') || "");
const group = ref(localStorage.getItem('group') || "");

interface Subject {
    groups: string[];
    name: string;
    type: string;
    subgroup: string;
    location: string;
    dateStr: string;
    dates: string[];
    time: number;
    url: string;
}

// Downloads subject data in ICS file format
function exportICS() {
    let dataStr = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//MSUT \"STANKIN\"//Schedule//RU\n\n";

    for (let i = 0; i < subjectsArr.length; i++) {
        for (let j = 0; j < subjectsArr[i].dates.length; j++) {
            const type = subjectsArr[i].type.replace("Лекции", "Лекция").replace("Cеминары", "Cеминар").replace("Лабораторные занятия", "Лабораторное занятие");
            const time: string = subjectsArr[i].type === "Лабораторные занятия" ? timeMap.get(subjectsArr[i].time + 8) : timeMap.get(subjectsArr[i].time);
            const startEnd = time.split(" - ");
            const date = subjectsArr[i].dates[j].split('T');
            let start = new Date(date[0] + 'T' + startEnd[0]);
            let end = new Date(date[0] + 'T' + startEnd[1]);

            start.setHours(start.getHours() + 25);
            end.setHours(end.getHours() + 25);

            dataStr += `BEGIN:VEVENT
UID:${i.toString() + j.toString()}
DTSTART:${start.toISOString()}
DTEND:${end.toISOString()}
SUMMARY:${subjectsArr[i].name}
DESCRIPTION:${type + ": " + subjectsArr[i].groups.join(", ") + ' ' + subjectsArr[i].subgroup}
LOCATION:${subjectsArr[i].location}
END:VEVENT\n\n`;
        }
    }

    dataStr += "END:VCALENDAR";

    const blob = new Blob([dataStr], { type: 'text/ics;charset=UTF-8' });
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', group.value != '' ? group.value + '.ics' : 'schedule.ics');
    a.click();
}

// Downloads subject data in CSV file format
function exportCSV() {
    const dataStr = [
        [
            "\"Группа или преподователь",
            "Подгруппа",
            "Предмет",
            "Тип занятия",
            "Кабинет",
            "Время",
            "URL",
            "Строка дат",
            "Даты"
        ],
        ...subjectsArr.map(item => [
            item.groups.join(', '),
            item.subgroup,
            item.name,
            item.type,
            item.location,
            item.type === "Лабораторные занятия" ? timeMap.get(item.time + 8) : timeMap.get(item.time),
            item.url,
            item.dateStr,
            item.dates.join(' ')
        ])
    ].map(e => e.join("\",\"")).join("\"\n\"");

    const blob = new Blob([dataStr], { type: 'text/csv;charset=UTF-8' });
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', group.value != '' ? group.value + '.csv' : 'schedule.csv');
    a.click();
}

// Downloads subject data in JSON file format
function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(subjectsArr, null, "\t"));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", group.value != '' ? group.value + '.json' : 'schedule.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importJSON() {

}
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[40%] flex flex-col my-auto min-w-[360px]">

                <my-button @click="importJSON()" class="mb-14 w-full">[WIP] Импортировать JSON<Icon class="ml-5 my-auto" name="bi:filetype-json" size="18px" /></my-button>

                <p class="text-lg font-black">
                    Экспорт расписания:
                </p>
                <div class="w-full h-0 border border-[#764462] mb-7"></div>
                <my-button @click="exportJSON()" class="mb-7 w-full">Экспортировать JSON<Icon class="ml-5 my-auto" name="bi:filetype-json" size="18px" /></my-button>
                <my-button @click="exportCSV()" class="mb-7 w-full">Экспортировать CSV<Icon class="ml-5 my-auto" name="bi:filetype-csv" size="18px" /></my-button>
                <my-button @click="exportICS()" class="mb-7 w-full">Экспортировать ICS<Icon class="ml-5 my-auto" name="uil:calender" size="18px" /></my-button>
            </div>
        </div>
        <Navbar />
    </div>
</template>