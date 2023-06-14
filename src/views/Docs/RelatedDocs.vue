<script setup lang="ts">
import { Dir } from "@/types";
import { DirIcon, EnterIcon } from "@/components/icon";

import { nextTick, ref, watch } from "vue";
import { gsap } from "gsap";
import { useRoute } from "vue-router";

const { dir } = defineProps<{
  dir: Dir | null;
}>();

// 子文件夹
const childDir = ref<Dir | null>(null);
const setChildDir = (dir: Dir | null) => {
  childDir.value = dir;
};

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    nextTick(() => {
      setChildDir(null);
    });
  }
);

const onBeforeEnter = (el: Element) => {
  const lastChild = el.lastChild;
  gsap.set(el, { opacity: 0 });
  gsap.set(lastChild, { y: -32 });
};
const onEnter = (el: Element) => {
  const lastChild = el.lastChild;

  gsap.to(el, { opacity: 1, duration: 0.2 });
  gsap.to(lastChild, { y: 0, duration: 0.3, ease: "power2.out" });
};

const onLeave = (el: Element, done: () => void) => {
  const lastChild = el.lastChild;
  gsap.to(el, {
    opacity: 0,
    duration: 0.2,
    delay: 0.1,
    onComplete: () => {
      done();
    },
  });
  gsap.to(lastChild, {
    y: -32,
    duration: 0.3,
    ease: "power2.out",
  });
};
</script>

<template>
  <div v-if="dir" class="relative p-4 select-none">
    <div class="font-bold">{{ dir.name }}</div>
    <ul>
      <li
        v-for="item in dir.children"
        :key="item.name"
        class="truncate hover:text-sky-500"
      >
        <!-- 文件夹 -->
        <div
          v-if="item.type === 'dir'"
          class="p-1 cursor-pointer"
          @click="setChildDir(item)"
        >
          <span class="">
            <DirIcon class="inline-block w-4 text-sky-500" />
          </span>
          {{ item.name }}
        </div>
        <!-- 文件 -->
        <RouterLink v-else :to="item.url" class="block p-1">
          <span
            class="inline-block w-2 h-1 mx-1 mb-[.2em] rounded-full bg-sky-500"
          ></span>
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>

    <!-- 展示子文件夹 -->
    <Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <div
        v-if="childDir"
        class="absolute inset-0 h-full overflow-hidden bg-gray-100 rounded-md shadow-inner dark:bg-gray-600"
      >
        <div
          class="py-1 text-xs cursor-pointer hover:bg-sky-500"
          @click="setChildDir(null)"
        >
          <span>
            <EnterIcon class="inline-block w-6 h-6 rotate-180" />
          </span>
          {{ dir.name }}
        </div>
        <RelatedDocs
          :dir="childDir"
          class="h-[calc(100%-1.25rem)] mt-[-0.25rem] bg-gray-200 rounded-md scrollbar dark:bg-gray-700"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
