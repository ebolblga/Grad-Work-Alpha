<script setup lang="ts">
import cv from "@techstark/opencv-js";
import { createWorker } from "tesseract.js";
useHead({ title: "Сканирование фото" });

const src = ref(""); // DataURL of processed image
let inputUrl = ""; // DataURL of uploaded image
const subjectsArray = ref<Subject[]>([]);

const MIN_CONTOURS_SCALE = 70; // Minimum original image ratio
const THRESHOLD = 128; // Monochrome threshold
const DOC_WIDTH = 1920; // Same ratio as A4 paper
const DOC_HEIGHT = 1203;  //1358

const worker = await createWorker();

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
  src.value = imgCanvas.toDataURL();

  fixPerspective(cv.imread(imgCanvas));
  // findContours(cv.imread(imgCanvas));

  console.log(Date.now() - start + " ms");
}

async function Slicer() {
  const slices: string[] = [];
  let img = new Image();
  img.src = inputUrl;
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
  const sliceWidth = imgCanvas.width / 8;

  for (let i = 0; i < 8; i++) {
    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = sliceWidth;
    sliceCanvas.height = imgCanvas.height;
    const sliceCtx = sliceCanvas.getContext('2d');
    if (!sliceCtx) return;
    sliceCtx.putImageData(imgData, -sliceWidth * i, 0);
    slices.push(sliceCanvas.toDataURL());
  }

  for (let i = 0; i < 7; i++) {
    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = sliceWidth * 2;
    sliceCanvas.height = imgCanvas.height;
    const sliceCtx = sliceCanvas.getContext('2d');
    if (!sliceCtx) return;
    sliceCtx.putImageData(imgData, -sliceWidth * i, 0);
    slices.push(sliceCanvas.toDataURL());
  }

  // console.log(slices);
  // src.value = slices[8];
  let timedItems: string[] = [];
  for (let i = 0; i < slices.length; i++) {
    timedItems.push(await OCR(slices[i]));
  }

  subjectsArray.value = parseSubjectDataIMG(timedItems, "student");
}

async function OCR(imgStr: string) {
  let img = new Image();
  img.src = imgStr;
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });

  await worker.loadLanguage('rus');
  await worker.initialize('rus');
  await worker.setParameters({
    tessedit_char_whitelist: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789[].-,() ',
  });
  const { data: { text } } = await worker.recognize(img);
  // console.log(text);

  // await worker.terminate();
  return text;
}

async function Main() {
  // let img = new Image();
  // img.src = inputUrl;
  // await new Promise((resolve) => {
  //   img.onload = () => resolve(1);
  // });

  // await worker.loadLanguage('rus');
  // await worker.initialize('rus');
  // await worker.setParameters({
  //   tessedit_char_whitelist: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789[].-,() ',
  // });
  // const { data: { text } } = await worker.recognize(img);
  // console.log(text);

  // await worker.terminate();

  // fixPerspective();

  findContours();
}

async function fixPerspective(im: cv.Mat) {
  // const start = Date.now();
  // let img = new Image();
  // img.src = inputUrl;
  // await new Promise((resolve) => {
  //   img.onload = () => resolve(1);
  // });
  // const im = cv.imread(img);
  const pts = getContoursPoints(im);

  if (pts) {
    const transformedIm = getTransformedImage(im, pts);
    let canvas = document.createElement("canvas");
    cv.imshow(canvas, transformedIm);
    src.value = canvas.toDataURL();
    // console.log("Perspective fix done!", Date.now() - start);
  } else {
    console.log("Perspective fix failed...");
  }

  im.delete();
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
    console.log(pts.data32S)
    pts.convertTo(pts, cv.CV_32FC2);
    console.log(pts.data32F)
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
    cols,
    0,
    0,
    0,
    0,
    rows,
    cols,
    rows,
  ]);
  // console.log(fromPts.data32S);
  const M = cv.getPerspectiveTransform(fromPts, toPts); // Matrix of transformations
  cv.warpPerspective(im, transformedIm, M, dsize, 1);

  fromPts.delete();
  toPts.delete();
  return transformedIm;
}

async function findContours(im: cv.Mat) {
  // let img = new Image();
  // img.src = inputUrl;
  // await new Promise((resolve) => {
  //   img.onload = () => resolve(1);
  // });
  // const im = cv.imread(img);

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
    const maxRectScale = parseInt(((cntArea / imRectArea) * 100).toString());
    if (maxRectScale >= MIN_CONTOURS_SCALE) {
      let approx = new cv.Mat();
      const epsilon = 0.02 * cv.arcLength(cnt, true);
      cv.approxPolyDP(cnt, approx, epsilon, true);

      if (approx.size().height === 4) {
        let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 255);
        console.log(i, color.toString());
        // let color = new cv.Scalar(255, 0, 0, 255);

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

function editSubject(item: Subject) {
  console.log(item.type);
}
</script>
<template>
  <div class="h-screen flex flex-col">
    <div class="h-[92vh] p-5 flex justify-center">
      <div class="w-[40%] flex flex-col my-auto">
        <input aria-label="Input for images to process"
          class="h-7 mb-3 block w-full text-sm text-gray-400 rounded-lg cursor-pointer focus:outline-none bg-[#764462] placeholder-gray-400"
          type="file" accept=".png, .jpg" @change="UploadImg($event)" />
        <img :src="src" v-if="src" class="h-[calc(100%-7px)] w-full object-contain" />
        <div class="overflow-auto h-[75vh] w-full scrollbar">
          <div v-for="(item, i) in subjectsArray" class="w-full bg-[#764462] rounded-lg mb-3 p-3 overflow-hidden" @click="editSubject(item)">
              <p class="text-sm text-[#C69787] inline">{{ item.groups.join(", ") }}</p>
              <p class="text-sm text-[#C69787] inline">{{ ' ' + item.subgroup }}</p>
              <p class="font-medium italic">{{ item.name }}</p>
              <p class="text-sm"
              :class="{ 'text-[#8CC487]': item.type.includes('Лекции'),
              'text-[#9b8fcf]': item.type.includes('Cеминары'),
              'text-[#ccc46f]': item.type.includes('Лабораторные занятия') }">{{ item.type }}</p>
              <p class="text-sm text-[#C69787] inline">{{ timeMap.get(item.time) }}</p>
              <p class="text-sm text-[#C69787] inline">{{ ' ' + item.dateStr }}</p>
              <p class="text-sm text-right text-[#C69787]">{{ item.location }}</p>
          </div>
        </div>
      </div>
    </div>
    <Navbar />
  </div>
</template>
