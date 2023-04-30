<script setup lang="ts">
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

useHead({ title: "Сканировать из PDF" });

const pdfJson = ref("");

async function pdfUploaded(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event: any) => {
        const typedarray = new Uint8Array(event.target.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const page = await pdf.getPage(1);
        const content = await page.getTextContent();
        // console.log(`Content:`);
        // console.log(
        //     content.items.map((item) => item.str + " " + item.transform).join("\n")
        // );
        content.items.map((item) => {
            console.log(item.str, item.transform);
        });
        pdfJson.value = content.items.map((item) => item.str).join("\n");
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
                <p>{{ pdfJson }}</p>
            </div>
        </div>
        <Navbar />
    </div>
</template>
