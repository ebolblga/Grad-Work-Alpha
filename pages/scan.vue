<script setup lang="ts">
import cv from "@techstark/opencv-js";
import { createWorker } from "tesseract.js";
useHead({ title: "Сканирование фото" });

const src = ref(""); // DataURL of processed image
let inputUrl = ""; // DataURL of uploaded image

const MIN_CONTOURS_SCALE = 2; // Minimum original image ratio
const THRESHOLD = 128; // Monochrome threshold
const DOC_WIDTH = 1920; // Same ratio as A4 paper
const DOC_HEIGHT = 1358;

const worker = await createWorker();

onMounted(async () => { });

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
      Main();
    };
  }
}

async function Main() {
  // let img = "/column.png";

  // await worker.loadLanguage('rus');
  // await worker.initialize('rus');
  // await worker.setParameters({
  //   tessedit_char_whitelist: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789[].-:,() ',
  // });
  // const { data: { text } } = await worker.recognize(img);
  // console.log(text);
  // await worker.terminate();

  // fixPerspective();

  findContours();
}

async function fixPerspective() {
  const start = Date.now();
  let img = new Image();
  img.src = inputUrl;
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });
  const im = cv.imread(img);
  const pts = getContoursPoints(im);

  if (pts) {
    const transformedIm = getTransformedImage(im, pts);
    let canvas = document.createElement("canvas");
    cv.imshow(canvas, transformedIm);
    src.value = canvas.toDataURL();
    console.log("Perspective fix done!", Date.now() - start);
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
    const maxRectScale = parseInt((cntArea / imRectArea) * 100); // How big is it compared to the original image (%)

    if (maxRectScale >= MIN_CONTOURS_SCALE) {
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
    pts.convertTo(pts, cv.CV_32FC2);
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

async function findContours() {
  let img = new Image();
  img.src = inputUrl;
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });
  const im = cv.imread(img);

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
    const maxRectScale = parseInt((cntArea / imRectArea) * 100);
    if (maxRectScale >= MIN_CONTOURS_SCALE) {
      let approx = new cv.Mat();
      const epsilon = 0.02 * cv.arcLength(cnt, true);
      cv.approxPolyDP(cnt, approx, epsilon, true);

      if (approx.size().height === 4) {
        // let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
        let color = new cv.Scalar(255, 0, 0, 255);

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
</script>
<template>
  <div class="h-screen flex flex-col">
    <div class="h-[92vh] p-5">
      <input aria-label="Input for images to process"
        class="h-7 block w-full text-sm text-gray-400 rounded-lg cursor-pointer focus:outline-none bg-[#764462] placeholder-gray-400"
        type="file" accept=".png, .jpg" @change="UploadImg($event)" />
      <img :src="src" v-if="src" class="h-[calc(100%-7px)] w-full object-contain" />
    </div>
    <Navbar />
  </div>
</template>
