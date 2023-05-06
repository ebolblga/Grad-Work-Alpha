<script setup lang="ts">
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

useHead({ title: "Сканировать из PDF" });

const timedItems = ref([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
]);

class Subject {
    groups: string[];
    name: string;
    type: string;
    subgroup: string;
    location: string;
    dateStr: string;
    dates: string[];
    time: number;

    constructor(groups: string[], name: string, type: string, subgroup: string, location: string, dateStr: string, dates: string[], time: number) {
        this.groups = groups;
        this.name = name;
        this.type = type;
        this.subgroup = subgroup;
        this.location = location;
        this.dateStr = dateStr;
        this.dates = dates;
        this.time = time;
    }
};

const user = localStorage.getItem('user') || "professor";
const beingEdited = ref(false);
const editableSubject = ref<Subject>(new Subject([""], "", "", "", "", "", [""], 0));
let editableSubjID = 0;
const treshold = 2;
const subjectsArray = ref<Subject[]>([]);

async function pdfUploaded(event: Event) {

    for (let i = 0; i < 8; i++) {
        timedItems.value[i] = "";
    }
    subjectsArray.value = [];
    
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event: Event) => {
        const typedarray = new Uint8Array(event.target.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const page = await pdf.getPage(1);
        const content = await page.getTextContent();

        // console.log(
        //     content.items.map((item) => item.str).join("")
        // );
        
        for (let i = 0; i < content.items.length; i++) {

            if (content.items[i].str === ' ' || content.items[i].transform[5] > 515) continue;

            if (content.items[i].transform[4] > 46 - treshold && content.items[i].transform[4] < 140 - treshold) {
                timedItems.value[0] += content.items[i].str;
                let height = content.items[i].transform[5];
                i++;
                while (!content.items[i].str.includes(']')) {
                    if (height > content.items[i].transform[5]) {
                        timedItems.value[0] += ' ';
                    }

                    timedItems.value[0] += content.items[i].str;
                    height = content.items[i].transform[5];
                    i++;
                }

                timedItems.value[0] += content.items[i].str;
            } else if (content.items[i].transform[4] > 140 - treshold && content.items[i].transform[4] < 234 - treshold) {
                timedItems.value[1] += content.items[i].str;
                let height = content.items[i].transform[5];
                i++;
                while (!content.items[i].str.includes(']')) {
                    if (height > content.items[i].transform[5]) {
                        timedItems.value[1] += ' ';
                    }
                    
                    timedItems.value[1] += content.items[i].str;
                    height = content.items[i].transform[5];
                    i++;
                }

                timedItems.value[1] += content.items[i].str;
            } else if (content.items[i].transform[4] > 234 - treshold && content.items[i].transform[4] < 327 - treshold) {
                timedItems.value[2] += content.items[i].str;
                let height = content.items[i].transform[5];
                i++;
                while (!content.items[i].str.includes(']')) {
                    if (height > content.items[i].transform[5]) {
                        timedItems.value[2] += ' ';
                    }
                    
                    timedItems.value[2] += content.items[i].str;
                    height = content.items[i].transform[5];
                    i++;
                }

                timedItems.value[2] += content.items[i].str;
            } else if (content.items[i].transform[4] > 327 - treshold && content.items[i].transform[4] < 421 - treshold) {
                timedItems.value[3] += content.items[i].str;
                let height = content.items[i].transform[5];
                i++;
                while (!content.items[i].str.includes(']')) {
                    if (height > content.items[i].transform[5]) {
                        timedItems.value[3] += ' ';
                    }
                    
                    timedItems.value[3] += content.items[i].str;
                    height = content.items[i].transform[5];
                    i++;
                }

                timedItems.value[3] += content.items[i].str;
            } else if (content.items[i].transform[4] > 421 - treshold && content.items[i].transform[4] < 514 - treshold) {
                timedItems.value[4] += content.items[i].str;
                let height = content.items[i].transform[5];
                i++;
                while (!content.items[i].str.includes(']')) {
                    if (height > content.items[i].transform[5]) {
                        timedItems.value[4] += ' ';
                    }
                    
                    timedItems.value[4] += content.items[i].str;
                    height = content.items[i].transform[5];
                    i++;
                }

                timedItems.value[4] += content.items[i].str;
            } else if (content.items[i].transform[4] > 514 - treshold && content.items[i].transform[4] < 608 - treshold) {
                timedItems.value[5] += content.items[i].str;
                let height = content.items[i].transform[5];
                i++;
                while (!content.items[i].str.includes(']')) {
                    if (height > content.items[i].transform[5]) {
                        timedItems.value[5] += ' ';
                    }
                    
                    timedItems.value[5] += content.items[i].str;
                    height = content.items[i].transform[5];
                    i++;
                }

                timedItems.value[5] += content.items[i].str;
            } else if (content.items[i].transform[4] > 608 - treshold && content.items[i].transform[4] < 702 - treshold) {
                timedItems.value[6] += content.items[i].str;
                let height = content.items[i].transform[5];
                i++;
                while (!content.items[i].str.includes(']')) {
                    if (height > content.items[i].transform[5]) {
                        timedItems.value[6] += ' ';
                    }
                    
                    timedItems.value[6] += content.items[i].str;
                    height = content.items[i].transform[5];
                    i++;
                }

                timedItems.value[6] += content.items[i].str;
            } else if (content.items[i].transform[4] > 702 - treshold && content.items[i].transform[4] < 796 - treshold) {
                timedItems.value[7] += content.items[i].str;
                let height = content.items[i].transform[5];
                i++;
                while (!content.items[i].str.includes(']')) {
                    if (height > content.items[i].transform[5]) {
                        timedItems.value[7] += ' ';
                    }
                    
                    timedItems.value[7] += content.items[i].str;
                    height = content.items[i].transform[5];
                    i++;
                }

                timedItems.value[7] += content.items[i].str;
            }
        }

        parseSubjectData(timedItems.value);
        // console.log(JSON.stringify(subjectsArray.value));
        localStorage.setItem('subjectsJSON', JSON.stringify(subjectsArray.value));
        // console.log(timedItems.value);
    };
    reader.readAsArrayBuffer(file);
};

function parseSubjectData(subjects: string[]) {
    for (let i = 0; i < 8; i++) {
        const subjectArray: string[] = subjects[i].split(']');
        if (subjectArray.length <= 1) continue;
        
        for (let j = 0; j < subjectArray.length - 1; j++) {
            subjectArray[j] += ']';
            const strArray: string[] = subjectArray[j].split('.');

            if (user === "professor") {
                let n = 0;
                const groups = strArray[0].split(',');
                const name = strArray[1];
                const type = strArray[2].replace(/\s+/g, '').replace("лекции", "Лекции").replace("семинар", "Cеминары").replace("лабораторныезанятия", "Лабораторные занятия");
                let subgroup = "";
                if (type.includes("Лабораторные занятия")) {
                    if (strArray[3].includes("(А)") || strArray[3].includes("(Б)")) {
                        subgroup = strArray[3];
                        n++;
                    }
                }
                
                const location = strArray[n + 3].replace(" ", "");
                let dates = strArray[n + 4] + '.';
                for (let p = n + 5; p < strArray.length; p++) {
                    dates += strArray[p] + '.';
                }

                const subject = new Subject(groups, name, type, subgroup.replace(" ", ""), location, dates.slice(0, -1), parseDates(dates.slice(0, -1)), i);
                subjectsArray.value.push(subject);
            } else {
                // console.log(strArray)
                let n = 0;
                const groups = [strArray[1] + '.' + strArray[2] + '.'];
                const name = strArray[0];
                const type = strArray[3].replace(/\s+/g, '').replace("лекции", "Лекции").replace("семинар", "Cеминары").replace("лабораторныезанятия", "Лабораторные занятия");
                let subgroup = "";
                if (type.includes("Лабораторные занятия")) {
                    if (strArray[4].includes("(А)") || strArray[4].includes("(Б)")) {
                        subgroup = strArray[4];
                        n++;
                    }
                }

                const location = strArray[n + 4].replace(" ", "");
                let dates = strArray[n + 5] + '.';
                for (let p = n + 6; p < strArray.length; p++) {
                    dates += strArray[p] + '.';
                }

                const subject = new Subject(groups, name, type, subgroup.replace(" ", ""), location, dates.slice(0, -1), parseDates(dates.slice(0, -1)), i);
                subjectsArray.value.push(subject);
            }


            
            // console.log(subject);
        }
    }
    
    // console.log(subjectsArray.value);
}

function parseDates(dates: string) {
    // return [dates];
    const tmpArray: string[] = dates.replace(/(к.н.)|(ч.н.)|[\[\] ]/g, '').split(',');
    let dateArray: string[] = [];
    let n = 7;
    if (dates.includes("ч.н.")) {
        n = 14;
    }

    for(let i = 0; i < tmpArray.length; i++) {
        if (tmpArray[i].includes('-')) {
            const [start, end]: string[] = tmpArray[i].split('-');
            let newDate = dateParser(start);
            const endDate = dateParser(end);

            while(newDate <= endDate) {
                dateArray.push(newDate.toISOString());
                newDate.setDate(newDate.getDate() + n);
            }

        } else {
            dateArray.push(dateParser(tmpArray[i]).toISOString());
        }
    }

    // console.log(dates, dateArray);
    return dateArray;
}

function dateParser(date: string) {
    const [day, month] = date.split('.');
    const year = new Date().getFullYear();
    return new Date(year, parseInt(month, 10) - 1, parseInt(day, 10));
}

function editSubject(item: Subject, id: number) {
    beingEdited.value = true;
    editableSubjID = id;
    editableSubject.value = item;
    console.log(editableSubject.value);
}

function saveSubject() {
    beingEdited.value = false;
    subjectsArray.value[editableSubjID] = editableSubject.value;
    subjectsArray.value[editableSubjID].groups = editableSubject.value.groups[0].split(',')
    subjectsArray.value[editableSubjID].dates = parseDates(editableSubject.value.dateStr);
}

function deleteSubject(id: number) {
    subjectsArray.value.splice(id, 1);
}
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[40%] flex flex-col my-auto">
                <input
                    aria-label="Input for images to process"
                    class="mb-5 h-7 block w-full text-sm text-gray-400 rounded-lg cursor-pointer focus:outline-none bg-[#764462] placeholder-gray-400"
                    type="file"
                    accept=".pdf"
                    @change="pdfUploaded($event)"
                />
                <div class="overflow-auto h-[75vh] w-full scrollbar">
                    <div v-if="!beingEdited" v-for="(item, i) in subjectsArray" class="relative w-full bg-[#764462] rounded-lg mb-3 p-3 overflow-hidden">
                        <p class="text-sm text-[#C69787] inline">{{ item.groups.join(", ") }}</p>
                        <p class="text-sm text-[#C69787] inline">{{ ' ' + item.subgroup }}</p>
                        <div class="w-6 h-6 absolute right-12 top-3 cursor-pointer" @click="editSubject(item, i)">
                            <svg class="fill-orange-400" height="24" viewBox="0 96 960 960" width="24">
                                <path d="M189 875h30l435-438-30-30-435 438v30Zm604-480L667 270l22-22q26-27 64-27.5t64 24.5l16 17q22 21 19.5 48.5T831 357l-38 38Zm-41 41L245 943H120V817l506-505 126 124Zm-111-13-17-16 30 30-13-14Z"/>
                            </svg>
                        </div>
                        <div class="w-6 h-6 absolute right-3 top-3 cursor-pointer" @click="deleteSubject(i)">
                            <svg class="fill-red-400" height="24" viewBox="0 96 960 960" width="24">
                                <path d="M253 957q-38.212 0-65.106-26.6Q161 903.8 161 866V314h-58v-91h228v-47h297v47h228v91h-58v552q0 37.175-27.206 64.088Q743.588 957 706 957H253Zm453-643H253v552h453V314ZM357 788h74V390h-74v398Zm173 0h75V390h-75v398ZM253 314v552-552Z"/>
                            </svg>
                        </div>
                        <p class="font-medium italic">{{ item.name }}</p>
                        <p class="text-sm"
                        :class="{ 'text-[#8CC487]': item.type.includes('Лекции'),
                        'text-[#9b8fcf]': item.type.includes('Cеминары'),
                        'text-[#ccc46f]': item.type.includes('Лабораторные занятия') }">{{ item.type }}</p>
                        <p class="text-sm text-[#C69787] inline">{{ timeMap.get(item.time) }}</p>
                        <p class="text-sm text-[#C69787] inline">{{ item.dateStr }}</p>
                        <p class="text-sm text-right text-[#C69787]">{{ item.location }}</p>
                    </div>
                    <div v-else class="overflow-x-hidden">
                        <div class="w-full bg-[#764462] rounded-lg mb-3 p-3">
                            <p class="block mb-2 text-sm font-medium">Группы / преподаватель</p>
                            <input v-model="editableSubject.groups" type="text" placeholder="ИДБ-19-03" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" />
                            <p class="block mb-2 text-sm font-medium">Подгруппа</p>
                            <!-- <input v-model="editableSubject.subgroup" type="text" placeholder="(А)" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" /> -->
                            <select v-model="editableSubject.subgroup" class="p-2.5 text-sm cursor-pointer w-full rounded-lg bg-[#764462] hover:bg-[#EDB4A1] hover:text-[#2C2137] outline-none border border-[#C69787] mb-1">
                                <option value=""></option>
                                <option value="(А)">(А)</option>
                                <option value="(Б)">(Б)</option>
                            </select>
                            <p class="block mb-2 text-sm font-medium">Предмет</p>
                            <input v-model="editableSubject.name" type="text" placeholder="Гипермедийные среды и технологии" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" />
                            <p class="block mb-2 text-sm font-medium">Тип занятия</p>
                            <!-- <input v-model="editableSubject.type" type="text" placeholder="Семинар" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" /> -->
                            <select v-model="editableSubject.type" class="p-2.5 text-sm cursor-pointer w-full rounded-lg bg-[#764462] hover:bg-[#EDB4A1] hover:text-[#2C2137] outline-none border border-[#C69787] mb-1">
                                <option value="Лекции">Лекции</option>
                                <option value="Cеминары">Cеминары</option>
                                <option value="Лабораторные занятия">Лабораторные занятия</option>
                            </select>
                            <p class="block mb-2 text-sm font-medium">Кабинет</p>
                            <input v-model="editableSubject.location" type="text" placeholder="240(а)" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" />
                            <p class="block mb-2 text-sm font-medium">Даты</p>
                            <input v-model="editableSubject.dateStr" type="text" placeholder="[17.02, 03.03-24.03 к.н.]" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" />
                            <p class="block mb-2 text-sm font-medium">Время</p>
                            <!-- <input v-model="editableSubject.time" type="text" placeholder="0" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" /> -->
                            <select v-model="editableSubject.time" class="p-2.5 text-sm cursor-pointer w-full rounded-lg bg-[#764462] hover:bg-[#EDB4A1] hover:text-[#2C2137] outline-none border border-[#C69787] mb-1">
                                <option value="0">8:30 - 10:10</option>
                                <option value="1">10:20 - 12:00</option>
                                <option value="2">12:20 - 14:00</option>
                                <option value="3">14:10 - 15:50</option>
                                <option value="4">16:00 - 17:40</option>
                                <option value="5">18:00 - 19:30</option>
                                <option value="6">19:40 - 21:10</option>
                                <option value="7">21:20 - 22:50</option>
                                <option value="8">8:30 - 12:00</option>
                                <option value="9">10:20 - 14:00</option>
                                <option value="10">12:20 - 15:50</option>
                                <option value="11">14:10 - 17:40</option>
                                <option value="12">16:00 - 19:30</option>
                                <option value="13">18:00 - 21:10</option>
                                <option value="14">19:40 - 22:50</option>
                            </select>
                        </div>
                        <my-button class="w-full" @click="saveSubject()">Сохранить изменения</my-button>
                    </div>
                </div>
            </div>
        </div>
        <Navbar />
    </div>
</template>
