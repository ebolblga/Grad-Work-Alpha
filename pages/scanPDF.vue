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
    url: string;

    constructor(groups: string[], name: string, type: string, subgroup: string, location: string, dateStr: string, dates: string[], time: number, url: string) {
        this.groups = groups;
        this.name = name;
        this.type = type;
        this.subgroup = subgroup;
        this.location = location;
        this.dateStr = dateStr;
        this.dates = dates;
        this.time = time;
        this.url = url;
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
                
                let location = strArray[n + 3].replace(" ", "");
                if (location === '') {
                    location = 'Онлайн';
                }
                let dates = strArray[n + 4] + '.';
                for (let p = n + 5; p < strArray.length; p++) {
                    dates += strArray[p] + '.';
                }

                const subject = new Subject(groups, name, type, subgroup.replace(" ", ""), location, dates.slice(0, -1), parseDates(dates.slice(0, -1)), i, '');
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

                let location = strArray[n + 4].replace(" ", "");
                if (location === '') {
                    location = 'Онлайн';
                }
                let dates = strArray[n + 5] + '.';
                for (let p = n + 6; p < strArray.length; p++) {
                    dates += strArray[p] + '.';
                }

                const subject = new Subject(groups, name, type, subgroup.replace(" ", ""), location, dates.slice(0, -1), parseDates(dates.slice(0, -1)), i, '');
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
}

function saveSubject() {
    beingEdited.value = false;
    subjectsArray.value[editableSubjID] = editableSubject.value;
    subjectsArray.value[editableSubjID].groups = editableSubject.value.groups[0].split(',')
    subjectsArray.value[editableSubjID].dates = parseDates(editableSubject.value.dateStr);
    localStorage.setItem('subjectsJSON', JSON.stringify(subjectsArray.value));
}

function deleteSubject(id: number) {
    subjectsArray.value.splice(id, 1);
    localStorage.setItem('subjectsJSON', JSON.stringify(subjectsArray.value));
}

function addSubject() {
    beingEdited.value = true;
    editableSubjID = subjectsArray.value.length;
    editableSubject.value = new Subject([""], "", "", "", "", "", [""], 0, '');
}
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[40%] flex flex-col my-auto min-w-[360px]">
                <input
                    aria-label="Input for images to process"
                    class="mb-5 h-6 block w-full text-sm text-[#2C2137] rounded-lg cursor-pointer focus:outline-none bg-[#F0BEAD] placeholder-[#D19F92]"
                    type="file"
                    accept=".pdf"
                    @change="pdfUploaded($event)"
                />
                <div class="overflow-auto overflow-x-hidden h-[75vh] w-full scrollbar">
                    <div v-if="!beingEdited" v-for="(item, i) in subjectsArray" class="relative w-full bg-[#F0BEAD] text-[#2C2137] rounded-lg mb-3 p-3 overflow-hidden">
                        <p class="text-sm inline">{{ item.groups.join(", ") }}</p>
                        <p class="text-sm inline">{{ ' ' + item.subgroup }}</p>
                        <div class="w-4 h-4 absolute right-10 top-3 cursor-pointer" @click="editSubject(item, i)">
                            <svg class="fill-none stroke-[#2C2137]" height="18" viewBox="0 0 13 12" width="18">
                                <path d="M5.51553 1.69322H1.71829C1.43055 1.69322 1.15459 1.80752 0.951129 2.01099C0.747666 2.21445 0.633362 2.4904 0.633362 2.77814V10.3726C0.633362 10.6604 0.747666 10.9363 0.951129 11.1398C1.15459 11.3433 1.43055 11.4576 1.71829 11.4576H9.31277C9.60051 11.4576 9.87647 11.3433 10.0799 11.1398C10.2834 10.9363 10.3977 10.6604 10.3977 10.3726V6.57539M9.584 0.879524C9.79981 0.663719 10.0925 0.54248 10.3977 0.54248C10.7029 0.54248 10.9956 0.663719 11.2114 0.879524C11.4272 1.09533 11.5484 1.38802 11.5484 1.69322C11.5484 1.99841 11.4272 2.29111 11.2114 2.50691L6.05799 7.66031L3.88814 8.20278L4.4306 6.03292L9.584 0.879524Z" stroke-width="1.08493" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="w-4 h-4 absolute right-3 top-3 cursor-pointer" @click="deleteSubject(i)">
                            <svg class="fill-none stroke-[#2C2137]" height="18" viewBox="0 0 13 12" width="18">
                                <path d="M0.636383 2.72723H1.72729M1.72729 2.72723H10.4546M1.72729 2.72723V10.3636C1.72729 10.6529 1.84223 10.9304 2.04681 11.135C2.2514 11.3396 2.52887 11.4545 2.8182 11.4545H8.27275C8.56207 11.4545 8.83955 11.3396 9.04414 11.135C9.24872 10.9304 9.36366 10.6529 9.36366 10.3636V2.72723M3.36366 2.72723V1.63632C3.36366 1.34699 3.47859 1.06952 3.68318 0.86493C3.88776 0.660345 4.16524 0.54541 4.45456 0.54541H6.63638C6.92571 0.54541 7.20319 0.660345 7.40777 0.86493C7.61236 1.06952 7.72729 1.34699 7.72729 1.63632V2.72723M4.45456 5.4545V8.72723M6.63638 5.4545V8.72723" stroke-width="1.09091" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <p class="font-bold italic">{{ item.name }}</p>
                        <p class="text-sm font-semibold"
                            :class="{ 'text-[#0D7211]': item.type.includes('Лекции'),
                            'text-[#1962DA]': item.type.includes('Cеминары'),
                            'text-[#8F5107]': item.type.includes('Лабораторные занятия') }">{{ item.type }}</p>
                        <p class="text-sm inline">{{ timeMap.get(item.time) }}</p>
                        <p class="text-sm inline">{{ item.dateStr }}</p>
                        <p class="text-sm text-right">{{ item.location }}</p>
                    </div>
                    <div v-else class="overflow-x-hidden text-[#2C2137] font-bold">
                        <div class="w-full bg-[#F0BEAD] rounded-lg mb-3 p-3">
                            <p class="block mb-2 text-sm font-medium">Группы / преподаватель</p>
                            <input v-model="editableSubject.groups[0]" type="text" placeholder="ИДБ-19-03" class="text-sm rounded-lg block w-full p-2.5 bg-[#F0BEAD] placeholder-[#D19F92] border border-[#C69787] mb-1" />
                            <p class="block mb-2 text-sm font-medium">Подгруппа</p>
                            <select v-model="editableSubject.subgroup" class="p-2.5 text-sm cursor-pointer w-full rounded-lg bg-[#F0BEAD] hover:bg-[#EDB4A1] hover:text-[#2C2137] outline-none border border-[#C69787] mb-1">
                                <option value=""></option>
                                <option value="(А)">(А)</option>
                                <option value="(Б)">(Б)</option>
                            </select>
                            <p class="block mb-2 text-sm font-medium">Предмет</p>
                            <input v-model="editableSubject.name" type="text" placeholder="Гипермедийные среды и технологии" class="text-sm rounded-lg block w-full p-2.5 bg-[#F0BEAD] placeholder-[#D19F92] border border-[#C69787] mb-1" />
                            <p class="block mb-2 text-sm font-medium">Тип занятия</p>
                            <select v-model="editableSubject.type" class="p-2.5 text-sm cursor-pointer w-full rounded-lg bg-[#F0BEAD] hover:bg-[#EDB4A1] hover:text-[#2C2137] outline-none border border-[#C69787] mb-1">
                                <option value="Лекции">Лекции</option>
                                <option value="Cеминары">Cеминары</option>
                                <option value="Лабораторные занятия">Лабораторные занятия</option>
                            </select>
                            <p class="block mb-2 text-sm font-medium">Кабинет</p>
                            <input v-model="editableSubject.location" type="text" placeholder="240(а)" class="text-sm rounded-lg block w-full p-2.5 bg-[#F0BEAD] placeholder-[#D19F92] border border-[#C69787] mb-1" />
                            <div v-if="editableSubject.location === 'Онлайн'">
                                <p class="block mb-2 text-sm font-medium">Ссылка</p>
                                <input v-model="editableSubject.url" type="text" placeholder="https://us04web.zoom.us/j/" class="text-sm rounded-lg block w-full p-2.5 bg-[#F0BEAD] placeholder-[#D19F92] border border-[#C69787] mb-1" />
                            </div>
                            <p class="block mb-2 text-sm font-medium">Даты</p>
                            <input v-model="editableSubject.dateStr" type="text" placeholder="[17.02, 03.03-24.03 к.н.]" class="text-sm rounded-lg block w-full p-2.5 bg-[#F0BEAD] placeholder-[#D19F92] border border-[#C69787] mb-1" />
                            <p class="block mb-2 text-sm font-medium">Время</p>
                            <select v-model="editableSubject.time" class="p-2.5 text-sm cursor-pointer w-full rounded-lg bg-[#F0BEAD] hover:bg-[#EDB4A1] hover:text-[#2C2137] outline-none border border-[#C69787] mb-1">
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
                    <my-button v-if="!beingEdited" class="w-full" @click="addSubject()">Добавить предмет</my-button>
                </div>
            </div>
        </div>
        <Navbar />
    </div>
</template>
