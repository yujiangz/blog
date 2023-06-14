<script setup lang="ts">
import { SunIcon, MoonIcon } from "../icon";
import { ref } from "vue";

// 主题
const localTheme = (() => {
  let t = window.localStorage.getItem("theme");
  if (t) {
    document.documentElement.classList.toggle("dark", t.includes("dark"));
    return t;
  }
  return null;
})();
const dark = ref(localTheme?.includes("dark") || false);
const toggleTheme = () => {
  dark.value = !dark.value;
  document.documentElement.classList.toggle("dark");
  window.localStorage.setItem("theme", dark.value ? "dark" : "light");
};
</script>

<template>
  <span @click="toggleTheme" class="inline-block">
    <SunIcon v-show="dark" class="text-sky-100" />
    <MoonIcon v-show="!dark" class="text-sky-500" />
  </span>
</template>

<style scoped></style>
