<script setup lang="ts">
import { Dir, Doc } from "@/types";
import DirCard from "@/components/common/DirCard.vue";
import { data as docs } from "@assets/data/docsApi";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import AppBg from "@/components/AppBg.vue";

const dirs: Dir[] = [];
const otherDocs: Dir = {
  // 存放没有分类的文档
  name: "未分类",
  children: [],
  type: "dir",
  mtime: Date.now(),
  birthtime: Date.now(),
};
docs.children.forEach((d: Doc | Dir) => {
  if (typeof (d as Dir).children !== "undefined") {
    dirs.push(d as Dir);
  } else {
    otherDocs.children.push(d as Doc);
  }
});
dirs.push(otherDocs);

// 开始的动画
const Container = ref<Element | null>(null);
onMounted(() => {
  const children = Container.value?.children;
  if (!children) return;
  gsap.set(Container.value, { overflow: "hidden" });
  gsap.set(children, { opacity: 0, y: 30 });
  const len = children.length;
  for (let i = 0; i < len; i++) {
    const child = children[i];
    gsap.to(child, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: i * 0.15,
      ease: "power2.out",
    });
  }
  gsap.to(Container.value, { overflow: "auto", delay: len * 0.15 });
});
</script>

<template>
  <div class="grid none">
    <span class="row-span-1"></span>
    <span class="row-span-2"></span>
    <span class="row-span-3"></span>
    <span class="row-span-4"></span>
    <span class="row-span-5"></span>
  </div>
  <AppBg />
  <div
    tag="div"
    class="grid min-h-screen grid-flow-row-dense grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto pt-[60px]"
    ref="Container"
  >
    <DirCard
      v-for="(dir, index) in dirs"
      :dir="dir"
      :svg="true"
      :key="index"
      :class="`row-span-${Math.ceil(dir.children.length / 3)}`"
      class="shadow-lg"
    />
  </div>
  <RouterView />
</template>

<style scoped></style>
