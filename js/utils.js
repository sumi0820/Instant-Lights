const canvas = document.querySelector("#splash");
const ctx = canvas.getContext("2d");
const canvasG = document.querySelector("#main");
const ctxG = canvasG.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
canvasG.width = innerWidth;
canvasG.height = innerHeight;

const colors = [
  "#2185C5",
  "#7ECEFD",
  "#ffd571",
  "#FF7F66",
  "#D2E603",
  "#5D54A4",
  "#C3AED6",
  "#FF9A76",
];

const particleColors = [
  "rgba(33,133,197,0.7)",
  "rgba(126, 206, 253,0.7)",
  "rgba(255, 213, 113,0.7)",
  "rgba(255,127,102,0.7)",
  "rgba(210,230,3,0.7)",
  "rgba(93,84,164,0.7)",
  "rgba(195,174,214,0.7)",
  "rgba(255,154,118,0.7)",
];

const bgColors = [
  "#51adcf",
  "#726a95",
  "#423144",
  "#ffc7c7",
  "#006a71",
  "#7d0633",
  "#ffc93c",
  "#ff4b5c",
];

const randomNum = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = (colorPalette) => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};

const clearCanvas = () => {
  ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
};

const removeObject = (objArr, index) => {
  objArr.splice(index, 1);
};

let dist = (objA, objB) => Math.hypot(objA.x - objB.x, objA.y - objB.y);
