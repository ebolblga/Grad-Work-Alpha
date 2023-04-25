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
async function UploadImg(event) {
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
        class="h-7 block w-full text-sm text-gray-400 rounded-lg border cursor-pointer focus:outline-none bg-[#543F40] border-gray-600 placeholder-gray-400"
        type="file" accept=".png, .jpg" @change="UploadImg($event)" />
      <img :src="src" v-if="src" class="h-[calc(100%-7px)] w-full object-contain" style="image-rendering: pixelated" />
    </div>
    <div class="h-[8vh]">
      <div
        class="mx-auto h-full lg:w-[40vw] md:w-[90vw] flex flex-row justify-around border border-[#543F40] border-t-4 border-l-0 border-r-0 border-b-0">
        <svg class="h-[5vh] my-auto fill-[#636767]" viewBox="0 0 48 48">
          <path
            d="M2.95 10.7V.9h9.75v4H6.95v5.8Zm38.15 0V4.9h-5.8v-4h9.8v9.8ZM2.95 47.05V37.3h4v5.75h5.75v4Zm32.35 0v-4h5.8V37.3h4v9.75Zm-21.2-6.6q-1.8 0-3.175-1.375Q9.55 37.7 9.55 35.9V12.05q0-1.75 1.375-3.15T14.1 7.5h19.85q1.75 0 3.15 1.4t1.4 3.15V35.9q0 1.8-1.4 3.175-1.4 1.375-3.15 1.375Zm4.25-20.8H29.7V16.3H18.35Zm0 6H29.7V22.3H18.35Zm0 6H29.7V28.3H18.35Z" />
        </svg>
        <svg class="h-[5vh] my-auto fill-[#543F40]" viewBox="0 0 48 48">
          <path
            d="M24 28.25q-.9 0-1.575-.65-.675-.65-.675-1.6 0-.9.675-1.575.675-.675 1.625-.675.9 0 1.55.65t.65 1.6q0 .9-.65 1.575-.65.675-1.6.675Zm-8 0q-.9 0-1.575-.65-.675-.65-.675-1.6 0-.9.65-1.575.65-.675 1.6-.675.9 0 1.575.65.675.65.675 1.6 0 .9-.65 1.575-.65.675-1.6.675Zm15.95 0q-.85 0-1.525-.65-.675-.65-.675-1.6 0-.9.675-1.575.675-.675 1.575-.675.9 0 1.575.65.675.65.675 1.6 0 .9-.675 1.575-.675.675-1.625.675Zm-7.95 8q-.9 0-1.575-.675Q21.75 34.9 21.75 34q0-.9.675-1.575.675-.675 1.625-.675.9 0 1.55.675t.65 1.625q0 .85-.65 1.525-.65.675-1.6.675Zm-8 0q-.9 0-1.575-.675Q13.75 34.9 13.75 34q0-.9.65-1.575.65-.675 1.6-.675.9 0 1.575.675.675.675.675 1.625 0 .85-.65 1.525-.65.675-1.6.675Zm15.95 0q-.85 0-1.525-.675Q29.75 34.9 29.75 34q0-.9.675-1.575.675-.675 1.575-.675.9 0 1.575.675.675.675.675 1.625 0 .85-.675 1.525-.675.675-1.625.675ZM9.5 45.1q-1.85 0-3.2-1.375T4.95 40.55V10.5q0-1.9 1.35-3.25T9.5 5.9h2.95V2.85h3.95V5.9h15.2V2.85h3.95V5.9h2.95q1.9 0 3.25 1.35t1.35 3.25v30.05q0 1.8-1.35 3.175Q40.4 45.1 38.5 45.1Zm0-4.55h29V19.6h-29v20.95Z" />
        </svg>
        <svg class="h-[5vh] my-auto fill-[#543F40]" viewBox="0 0 48 48">
          <path
            d="M10.25 42.2q-1.8 0-3.175-1.35Q5.7 39.5 5.7 37.6v-9.4h4.55v9.4H37.7v-9.4h4.55v9.4q0 1.9-1.4 3.25T37.7 42.2ZM24 31.25l-11.2-11.2 3.25-3.2 5.65 5.7V4.65h4.55v17.9l5.65-5.7 3.35 3.2Z" />
        </svg>
        <svg class="h-[5vh] my-auto fill-[#543F40]" viewBox="0 0 48 48">
          <path
            d="M18.45 45.05 17.4 38.4q-.7-.2-1.55-.7-.85-.5-1.4-.95l-6.2 2.85-5.65-10 5.65-4.1q-.05-.25-.05-.725v-1.5q0-.425.05-.775L2.6 18.3l5.65-9.9 6.3 2.85q.5-.35 1.35-.85.85-.5 1.5-.7l1.05-6.8H29.6l1 6.75q.75.2 1.575.7.825.5 1.375.9l6.3-2.85 5.6 9.9-5.75 4.05q.05.4.125.85.075.45.075.8 0 .35-.075.775-.075.425-.125.775l5.75 4.05-5.7 10-6.2-2.85q-.55.45-1.425.975-.875.525-1.475.675l-1.05 6.65Zm5.5-14.7q2.65 0 4.5-1.85T30.3 24q0-2.6-1.85-4.475-1.85-1.875-4.5-1.875-2.7 0-4.525 1.875Q17.6 21.4 17.6 24q0 2.65 1.825 4.5t4.525 1.85Z" />
        </svg>
      </div>
    </div>
  </div>
</template>
