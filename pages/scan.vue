<script setup lang="ts">
import cv from "@techstark/opencv-js";
import { createWorker } from "tesseract.js";
useHead({ title: "Сканирование фото" });

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

const src = ref(""); // DataURL of processed image
let inputUrl = ""; // DataURL of uploaded image
const subjectsArray = ref<Subject[]>([]);
const beingEdited = ref(false);
const editableSubject = ref<Subject>(new Subject([""], "", "", "", "", "", [""], 0));
let editableSubjID = 0;

const MIN_CONTOURS_SCALE = 70; // Minimum original image ratio
const THRESHOLD = 128; // Monochrome threshold
const DOC_WIDTH = 1920; // Same ratio as A4 paper
const DOC_HEIGHT = 1203;  //1358

// const worker = await createWorker();

// Uploads image to DataURL
async function UploadImg(event: Event) {
  // const target = event.target as HTMLInputElement;
  // const files: FileList | null = target.files;
  // if (files) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(files[0]); // Read file as data url
  //   reader.onload = (event) => {
  //     // Called once readAsDataURL is completed
  //     inputUrl = target.value;
  //     Main();
  //   };
  // }

  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // Read file as data url
    reader.onload = (event) => {
      // Called once readAsDataURL is completed
      inputUrl = event.target.result;
      // Main();
      // Slicer();
      FULLPROCESSING();
    };
  }
}

async function FULLPROCESSING() {
  const start = Date.now();

  const img = new Image();
  img.src = inputUrl;
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });

  const imgWidth = img.width;
  const imgHeight = img.height;

  const imgCanvas = document.createElement("canvas");
  imgCanvas.width = imgWidth;
  imgCanvas.height = imgHeight;
  const imgContext = imgCanvas.getContext("2d", { willReadFrequently: true });
  if (!imgContext) return;
  imgContext.drawImage(img, 0, 0, imgWidth, imgHeight);

  let imageData = imgContext.getImageData(0, 0, imgWidth, imgHeight);

  binarizationWulff(imageData, imgWidth, imgHeight, 10, 0.2);

  imgContext.putImageData(imageData, 0, 0);
  // src.value = imgCanvas.toDataURL();

  src.value = await fixPerspective(cv.imread(imgCanvas));
  // findContours(cv.imread(imgCanvas));
  // await Slicer(src.value);
  await OCR2(src.value);

  console.log(Date.now() - start + " ms");
}

async function Slicer(DataURL: string) {
  const slices: HTMLCanvasElement[] = [];
  let img = new Image();
  img.src = DataURL;
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });

  const imgCanvas = document.createElement("canvas");
  imgCanvas.width = DOC_WIDTH;
  imgCanvas.height = DOC_HEIGHT;
  const imgContext = imgCanvas.getContext("2d");
  if (!imgContext) return;
  imgContext.drawImage(img, 0, 0, img.width, img.height);


  const imgData = imgContext.getImageData(0, 0, imgCanvas.width, imgCanvas.height);
  // const sliceWidth = imgCanvas.width / 8;
  const sliceWidth = 1888 / 8;

  for (let i = 0; i < 8; i++) {
    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = sliceWidth;
    sliceCanvas.height = imgCanvas.height - 32;
    const sliceCtx = sliceCanvas.getContext('2d');
    if (!sliceCtx) return;
    sliceCtx.putImageData(imgData, (-sliceWidth * i) - 32, -32);
    slices.push(sliceCanvas);
  }

  for (let i = 0; i < 7; i++) {
    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = sliceWidth * 2;
    sliceCanvas.height = imgCanvas.height - 32;
    const sliceCtx = sliceCanvas.getContext('2d');
    if (!sliceCtx) return;
    sliceCtx.putImageData(imgData, (-sliceWidth * i) - 32, -32);
    slices.push(sliceCanvas);
  }

  // console.log(slices);
  // src.value = slices[1];
  let timedItems: string[] = [];
  for (let i = 0; i < slices.length; i++) {
    timedItems.push(await OCR(slices[i]));
  }

  subjectsArray.value = parseSubjectDataIMG(timedItems, "student");
}

async function OCR(img: HTMLCanvasElement) {
  await worker.loadLanguage('rus');
  await worker.initialize('rus');
  await worker.setParameters({
    tessedit_char_whitelist: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789[].-,() ',
  });
  const { data: { text } } = await worker.recognize(img);

  // await worker.terminate();
  return text;
}

async function OCR2(DataURL: string) {
  let img = new Image();
  img.src = DataURL;
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });

  const imgCanvas = document.createElement("canvas");
  imgCanvas.width = DOC_WIDTH;
  imgCanvas.height = DOC_HEIGHT;
  const imgContext = imgCanvas.getContext("2d");
  if (!imgContext) return;
  imgContext.drawImage(img, 0, 0, img.width, img.height);

  let recognizedTxt: string[] = [];
  const sliceWidth = (DOC_WIDTH - 32) / 8;
  const worker = await createWorker();
  await worker.loadLanguage('rus');
  await worker.initialize('rus');
  await worker.setParameters({
    tessedit_char_whitelist: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789[].-,() ',
  });
  for (let i = 0; i < 8; i++) {
    const { data: { text } } = await worker.recognize(img, {
      rectangle: { top: 32, left: (sliceWidth * i) + 32, width: sliceWidth, height: DOC_HEIGHT - 32 },
    });
    recognizedTxt.push(text);
  }

  for (let i = 0; i < 7; i++) {
    const { data: { text } } = await worker.recognize(img, {
      rectangle: { top: 32, left: (sliceWidth * i) + 32, width: sliceWidth * 2, height: DOC_HEIGHT - 32 },
    });
    recognizedTxt.push(text);
  }
  
  await worker.terminate();
  subjectsArray.value = parseSubjectDataIMG(recognizedTxt, "student");
  localStorage.setItem('subjectsJSON', JSON.stringify(subjectsArray.value));
  return;
}

async function fixPerspective(im: cv.Mat) {
  const pts = getContoursPoints(im);

  if (pts) {
    const transformedIm = getTransformedImage(im, pts);
    im.delete();
    let canvas = document.createElement("canvas");
    cv.imshow(canvas, transformedIm);
    // src.value = canvas.toDataURL();
    // console.log("Perspective fix done!", Date.now() - start);
    return canvas.toDataURL();
  } else {
    console.log("Perspective fix failed...");
  }

  im.delete();
  return "";
}

function getContoursPoints(im: cv.Mat) {
  // Image area
  const imRectArea = im.cols * im.rows;

  // Grayscale
  let im_gray = new cv.Mat();
  cv.cvtColor(im, im_gray, cv.COLOR_RGBA2GRAY);

  // Threshold
  let threshold_im = new cv.Mat();
  cv.threshold(im_gray, threshold_im, THRESHOLD, 255, cv.THRESH_BINARY);

  // Contours
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(
    threshold_im,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );
  hierarchy.delete();

  let pts = null;
  let maxCntArea = 0;

  for (let i = 0; i < Number(contours.size()); ++i) {
    let cnt = contours.get(i);
    const cntArea = cv.contourArea(cnt);
    const maxRectScale = (cntArea / imRectArea) * 100; // How big is it compared to the original image (%)

    if (maxRectScale >= MIN_CONTOURS_SCALE && maxRectScale < 99) {
      // Filter by ratio to original image
      if (cntArea > maxCntArea) {
        // Keep larger
        let approx = new cv.Mat();
        const epsilon = 0.02 * cv.arcLength(cnt, true);
        cv.approxPolyDP(cnt, approx, epsilon, true);
        // Add ratio check here later
        if (approx.size().height === 4) {
          // Keep if it is a rectangle
          maxCntArea = cntArea;
          pts = approx; // Coordinates of the rectangle to be cut out (4 points)
        }
      }
    }
  }

  contours.delete();
  im_gray.delete();
  threshold_im.delete();
  if (pts) {
    // console.log(pts.data32S)
    pts.convertTo(pts, cv.CV_32FC2);
    // console.log(pts.data32F[0])
    // pts.data32F[0]
  } else {
    console.log("Rectangles not found")
  }

  return pts;
}

function getTransformedImage(im: cv.Mat, fromPts: cv.Mat) {
  let transformedIm = new cv.Mat();
  // const rows = im.rows;
  // const cols = im.cols;
  const rows = DOC_HEIGHT;
  const cols = DOC_WIDTH;
  let dsize = new cv.Size(cols, rows);
  const toPts = cv.matFromArray(4, 1, cv.CV_32FC2, [
    0,
    0,
    cols,
    0,
    cols,
    rows,
    0,
    rows,
  ]);
  // console.log(fromPts.data32S);
  const M = cv.getPerspectiveTransform(fromPts, toPts); // Matrix of transformations
  cv.warpPerspective(im, transformedIm, M, dsize, 1);

  fromPts.delete();
  toPts.delete();
  return transformedIm;
}

async function drawContours(im: cv.Mat) {
  // Image area
  const imRectArea = im.cols * im.rows;

  // Grayscale
  let im_gray = new cv.Mat();
  cv.cvtColor(im, im_gray, cv.COLOR_RGBA2GRAY);

  // Threshold
  let threshold_im = new cv.Mat();
  cv.threshold(im_gray, threshold_im, THRESHOLD, 255, cv.THRESH_BINARY);

  // Contours
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(
    threshold_im,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );

  for (let i = 0; i < Number(contours.size()); ++i) {
    let cnt = contours.get(i);
    const cntArea = cv.contourArea(cnt);
    const maxRectScale = (cntArea / imRectArea) * 100;
    if (maxRectScale >= MIN_CONTOURS_SCALE&& maxRectScale < 99) {
      let approx = new cv.Mat();
      const epsilon = 0.02 * cv.arcLength(cnt, true);
      cv.approxPolyDP(cnt, approx, epsilon, true);

      if (approx.size().height === 4) {
        let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 255);

        cv.drawContours(im, contours, i, color, 3, cv.LINE_AA, hierarchy, 0);
      }
    }
  }

  let canvas = document.createElement("canvas");
  cv.imshow(canvas, im);
  src.value = canvas.toDataURL();

  hierarchy.delete();
  contours.delete();
  im_gray.delete();
  threshold_im.delete();
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
    editableSubject.value = new Subject([""], "", "", "", "", "", [""], 0);
}
</script>
<template>
  <div class="h-screen flex flex-col">
    <div class="h-[92vh] p-5 flex justify-center">
      <div class="w-[40%] flex flex-col my-auto">
        <input aria-label="Input for images to process"
          class="h-7 mb-3 block w-full text-sm text-gray-400 rounded-lg cursor-pointer focus:outline-none bg-[#764462] placeholder-gray-400"
          type="file" accept=".png, .jpg" @change="UploadImg($event)" />
        <img :src="src" v-if="src" class="h-[calc(100%-7px)] w-full object-contain mb-3" />
        <div class="overflow-auto overflow-x-hidden h-[50vh] w-full scrollbar">
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
              <p class="text-sm text-[#C69787] inline">{{ ' ' + item.dateStr }}</p>
              <p class="text-sm text-right text-[#C69787]">{{ item.location }}</p>
          </div>
          <div v-else class="overflow-x-hidden">
            <div class="w-full bg-[#764462] rounded-lg mb-3 p-3">
                <p class="block mb-2 text-sm font-medium">Группы / преподаватель</p>
                <input v-model="editableSubject.groups[0]" type="text" placeholder="ИДБ-19-03" class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400 border border-[#C69787] mb-1" />
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
        <my-button v-if="!beingEdited" class="w-full" @click="addSubject()">Добавить</my-button>
        </div>
      </div>
    </div>
    <Navbar />
  </div>
</template>
