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
const user = localStorage.getItem('user') || "professor";
const subjectsArray = ref<Subject[]>([]);
const beingEdited = ref(false);
const editableSubject = ref<Subject>(new Subject([""], "", "", "", "", "", [""], 0));
let editableSubjID = 0;

const MIN_CONTOURS_SCALE = 70; // Minimum original image ratio
const THRESHOLD = 128; // Monochrome threshold
const DOC_WIDTH = 1920; // Same ratio as A4 paper
const DOC_HEIGHT = 1203;  //1358

// const worker = await createWorker();

// Загрузка изображения как DataURL
async function UploadImg(event: Event) {

  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // Считать файл как url
    reader.onload = (event) => {
      // Вызывается когда readAsDataURL закончена
      inputUrl = event.target.result;
      FULLPROCESSING();
    };
  }
}

// Основная функция считывания расписания из изображения
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
  // Получение байтов изображения
  let imageData = imgContext.getImageData(0, 0, imgWidth, imgHeight);
  // Бинаризация
  binarizationWulff(imageData, imgWidth, imgHeight, 10, 0.2);

  imgContext.putImageData(imageData, 0, 0);
  // Выравнивание перспективы
  src.value = await fixPerspective(cv.imread(imgCanvas));
  // Оптическое распознавание текста
  await OCR2(src.value);

  console.log(Date.now() - start + " ms");
}

// Функция считывания текста
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
  // Создание worker'a tesseract и его настройка
  let recognizedTxt: string[] = [];
  const sliceWidth = (DOC_WIDTH - 32) / 8;
  const worker = await createWorker();
  await worker.loadLanguage('rus');
  await worker.initialize('rus');
  await worker.setParameters({
    tessedit_char_whitelist: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789[].-,() ',
  });
  // Проход по сегментам изображения и считывание текста
  for (let i = 0; i < 8; i++) {
    const { data: { text } } = await worker.recognize(img, {
      rectangle: { top: 32, left: (sliceWidth * i) + 32, width: sliceWidth, height: DOC_HEIGHT - 32 },
    });
    recognizedTxt.push(text);
  }
  // Второй проход для считывания лаб. занятий
  for (let i = 0; i < 7; i++) {
    const { data: { text } } = await worker.recognize(img, {
      rectangle: { top: 32, left: (sliceWidth * i) + 32, width: sliceWidth * 2, height: DOC_HEIGHT - 32 },
    });
    recognizedTxt.push(text);
  }
  
  await worker.terminate();
  // Вызов парсера
  subjectsArray.value = parseSubjectDataIMG(recognizedTxt, user);
  // Сохранения расписания
  localStorage.setItem('subjectsJSON', JSON.stringify(subjectsArray.value));
  return;
}

// Функция выравнивания перспективы
async function fixPerspective(im: cv.Mat) {
  // Получить точки углов таблицы
  const pts = getContoursPoints(im);

  if (pts) {
    // Выровнять
    const transformedIm = getTransformedImage(im, pts);
    im.delete();
    let canvas = document.createElement("canvas");
    cv.imshow(canvas, transformedIm);
    return canvas.toDataURL();
  } else {
    console.log("Perspective fix failed...");
  }

  im.delete();
  return "";
}

// Функция получения точек контура
function getContoursPoints(im: cv.Mat) {
  // Image area
  const imRectArea = im.cols * im.rows;

  // Grayscale
  let im_gray = new cv.Mat();
  cv.cvtColor(im, im_gray, cv.COLOR_RGBA2GRAY);

  // Threshold
  let threshold_im = new cv.Mat();
  cv.threshold(im_gray, threshold_im, THRESHOLD, 255, cv.THRESH_BINARY);

  // Контуры
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
    const maxRectScale = (cntArea / imRectArea) * 100; // Размер контура относительно оригинального изображения (%)

    if (maxRectScale >= MIN_CONTOURS_SCALE && maxRectScale < 99) {
      // Фильтр контуров
      if (cntArea > maxCntArea) {
        // Выбор самого большого
        let approx = new cv.Mat();
        const epsilon = 0.02 * cv.arcLength(cnt, true);
        cv.approxPolyDP(cnt, approx, epsilon, true);
        if (approx.size().height === 4) {
          // Сохранить если четырёхугольник
          maxCntArea = cntArea;
          pts = approx; // Координаты углов контура
        }
      }
    }
  }

  contours.delete();
  im_gray.delete();
  threshold_im.delete();
  if (pts) {
    pts.convertTo(pts, cv.CV_32FC2);
  } else {
    console.log("Rectangles not found")
  }

  return pts;
}

// Функция трансформации изображения
function getTransformedImage(im: cv.Mat, fromPts: cv.Mat) {
  let transformedIm = new cv.Mat();
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
  const M = cv.getPerspectiveTransform(fromPts, toPts); // Матрица трансформации
  cv.warpPerspective(im, transformedIm, M, dsize, 1); // Применение матрицы трансформации

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
      <div class="w-[40%] flex flex-col my-auto min-w-[360px]">
        <input aria-label="Input for images to process"
          class="h-6 mb-3 block w-full text-sm text-[#2C2137] rounded-lg cursor-pointer focus:outline-none bg-[#F0BEAD] placeholder-[#D19F92]"
          type="file" accept=".png, .jpg" @change="UploadImg($event)" />
        <img :src="src" v-if="src" class="h-[calc(100%-7px)] w-full object-contain mb-3" />
        <div class="overflow-auto overflow-x-hidden h-[50vh] w-full scrollbar">
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
