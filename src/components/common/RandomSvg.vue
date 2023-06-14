<script setup lang="ts">
const { viewBoxW, viewBoxH } = defineProps({
  viewBoxW: {
    type: Number,
    default: 200,
  },
  viewBoxH: {
    type: Number,
    default: 200,
  },
});
const getSvgOfPath = (width = viewBoxW, height = viewBoxH) => {
  let paths = [];
  let len = ~~(Math.random() * 3) + 2;
  for (let i = 0; i < len; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const rx = Math.floor(Math.random() * width);
    const ry = Math.floor(Math.random() * height);
    const xAxisRotation = Math.floor(Math.random() * 180);
    const largeArcFlag = Math.floor(Math.random() * 2);
    const sweepFlag = Math.floor(Math.random() * 2);
    paths.push(
      `M ${x} ${y} a ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`
    );
  }
  return paths.join(" ");
};

const path = getSvgOfPath();
</script>

<template>
  <svg
    :view-box="`0 0 ${viewBoxW} ${viewBoxH}`"
    stroke="current"
    stroke-width="currentWidth"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="currentColor"
      stroke-width="currentWidth"
      :d="path"
    ></path>
  </svg>
</template>

<style scoped></style>
