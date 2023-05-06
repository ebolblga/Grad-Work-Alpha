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
                console.log(strArray)
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

function editSubject(item: Subject) {
    beingEdited.value = true;
    editableSubject.value = item;
    console.log(editableSubject.value);
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
                    <div v-if="!beingEdited" v-for="(item, i) in subjectsArray" class="w-full bg-[#764462] rounded-lg mb-3 p-3 overflow-hidden" @click="editSubject(item)">
                        <p class="text-sm text-[#C69787] inline">{{ item.groups.join(", ") }}</p>
                        <p class="text-sm text-[#C69787] inline">{{ ' ' + item.subgroup }}</p>
                        <p class="font-medium italic">{{ item.name }}</p>
                        <p class="text-sm"
                        :class="{ 'text-[#8CC487]': item.type.includes('Лекции'),
                        'text-[#9b8fcf]': item.type.includes('Cеминары'),
                        'text-[#ccc46f]': item.type.includes('Лабораторные занятия') }">{{ item.type }}</p>
                        <p class="text-sm text-[#C69787] inline">{{ timeMap.get(item.time) }}</p>
                        <p class="text-sm text-[#C69787] inline">{{ item.dateStr }}</p>
                        <p class="text-sm text-right text-[#C69787]">{{ item.location }}</p>
                    </div>
                    <div v-else>
                        <div class="w-full bg-[#764462] rounded-lg mb-3 p-3">
                        <input v-model="editableSubject.groups" type="text" placeholder="ИДБ-19-03(А)" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" />
                        <input v-model="editableSubject.name" type="text" placeholder="ИДБ-19-03(А)" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" />
                        
                        </div>
                        <my-button class="w-full">Сохранить изменения</my-button>
                    </div>
                </div>
            </div>
        </div>
        <Navbar />
    </div>
</template>
