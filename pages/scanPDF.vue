<script setup lang="ts">
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

useHead({ title: "Сканировать из PDF" });

const pdfJson = ref("");
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
const treshold = 2;

async function pdfUploaded(event: Event) {

    for (let i = 0; i < 8; i++) {
        timedItems.value[i] = "";
    }
    
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event: Event) => {
        const typedarray = new Uint8Array(event.target.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const page = await pdf.getPage(1);
        const content = await page.getTextContent();
        // console.log(`Content:`);
        // console.log(
        //     content.items.map((item) => item.str + " " + item.transform).join("\n")
        // );

        // content.items.map((item) => {
        //     console.log(item.str, Math.round(item.transform[4]), Math.round(item.transform[5]));
        // });
        // pdfJson.value = content.items.map((item) => item.str).join("\n");
        for (let i = 0; i < content.items.length; i++) {
            console.log(content.items[i].str, Math.round(content.items[i].transform[4]), Math.round(content.items[i].transform[5]));

            if (content.items[i].str === ' ' || content.items[i].transform[5] > 511) continue;

            if (content.items[i].transform[4] > 46 - treshold && content.items[i].transform[4] < 140 - treshold) {
                timedItems.value[0] += content.items[i].str;
                i++;
                while (!content.items[i].str.includes(']')) {
                    timedItems.value[0] += content.items[i].str;
                    i++;
                }

                timedItems.value[0] += ']';
            } else if (content.items[i].transform[4] > 140 - treshold && content.items[i].transform[4] < 234 - treshold) {
                timedItems.value[1] += content.items[i].str;
                i++;
                while (!content.items[i].str.includes(']')) {
                    timedItems.value[1] += content.items[i].str;
                    i++;
                }

                timedItems.value[1] += ']';
            } else if (content.items[i].transform[4] > 234 - treshold && content.items[i].transform[4] < 327 - treshold) {
                timedItems.value[2] += content.items[i].str;
                i++;
                while (!content.items[i].str.includes(']')) {
                    timedItems.value[2] += content.items[i].str;
                    i++;
                }

                timedItems.value[2] += content.items[i].str;
            } else if (content.items[i].transform[4] > 327 - treshold && content.items[i].transform[4] < 421 - treshold) {
                timedItems.value[3] += content.items[i].str;
                i++;
                while (!content.items[i].str.includes(']')) {
                    timedItems.value[3] += content.items[i].str;
                    i++;
                }

                timedItems.value[3] += content.items[i].str;
            } else if (content.items[i].transform[4] > 421 - treshold && content.items[i].transform[4] < 514 - treshold) {
                timedItems.value[4] += content.items[i].str;
                i++;
                while (!content.items[i].str.includes(']')) {
                    timedItems.value[4] += content.items[i].str;
                    i++;
                }

                timedItems.value[4] += content.items[i].str;
            } else if (content.items[i].transform[4] > 514 - treshold && content.items[i].transform[4] < 608 - treshold) {
                timedItems.value[5] += content.items[i].str;
                i++;
                while (!content.items[i].str.includes(']')) {
                    timedItems.value[5] += content.items[i].str;
                    i++;
                }

                timedItems.value[5] += content.items[i].str;
            } else if (content.items[i].transform[4] > 608 - treshold && content.items[i].transform[4] < 702 - treshold) {
                timedItems.value[6] += content.items[i].str;
                i++;
                while (!content.items[i].str.includes(']')) {
                    timedItems.value[6] += content.items[i].str;
                    i++;
                }

                timedItems.value[6] += content.items[i].str;
            } else if (content.items[i].transform[4] > 702 - treshold && content.items[i].transform[4] < 796 - treshold) {
                timedItems.value[7] += content.items[i].str;
                i++;
                while (!content.items[i].str.includes(']')) {
                    timedItems.value[7] += content.items[i].str;
                    i++;
                }

                timedItems.value[7] += content.items[i].str;
            }
        }
        // console.log(timedItems.value);
    };
    reader.readAsArrayBuffer(file);
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
                <!-- <p>{{ pdfJson }}</p> -->
                <div v-for="(item, i) in timedItems">
                    <p class="text-green-500">{{i}}</p>
                    <p>{{item}}</p>
                </div>
            </div>
        </div>
        <Navbar />
    </div>
</template>
