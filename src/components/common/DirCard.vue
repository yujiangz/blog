<script setup lang="ts">
import { Dir } from "@/types";
import { DirIcon, EnterIcon } from "../icon";
import { getColorCode } from "@utils/decoration";
import RandomSvg from "./RandomSvg.vue";
import dayjs from "dayjs";
import gsap from "gsap";
import { ref, toRaw } from "vue";

const props = defineProps({
  dir: {
    type: Object as () => Dir,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  svg: {
    type: Boolean,
    default: false,
  },
});

const dir = toRaw(props.dir);

const color = getColorCode();

const style = {
  card: {
    borderColor: "#ffffff55",
    borderWidth: "3px",
  },
  leftWrapper: {
    backgroundColor: color + "00",
  },
  svg: {
    color: color + "aa",
  },
  dirIcon: {
    color: color + "",
  },
  docIcon: {
    backgroundColor: color + "aa",
  },
};

// 子卡片
const childCard = ref<Dir | null>();

const childCardBeforeEnter = (el: Element) => {
  gsap.set(el.firstElementChild, { x: "100%", opacity: 0 });
  gsap.set(el.lastElementChild, { x: "100%" });
  gsap.set(el, { opacity: 0 });
};
const childCardEnter = (el: Element) => {
  gsap.to(el.firstElementChild, {
    x: "0%",
    opacity: 1,
    duration: 0.3,
    delay: 0.2,
    ease: "power2.out",
  });
  gsap.to(el.lastElementChild, { x: "0%", duration: 0.3, ease: "power2.out" });
  gsap.to(el, { opacity: 1, duration: 0.4, ease: "power2.out" });
};

const childCardLeave = (el: Element, done: () => void) => {
  gsap.to(el.firstElementChild, {
    x: "-100%",
    duration: 0.2,
    ease: "power2.in",
  });
  gsap.to(el.lastElementChild, {
    x: -30,
    duration: 0.3,
    delay: 0.1,
    ease: "power2.in",
  });
  gsap.to(el, {
    duration: 0.4,
    opacity: 0,
    ease: "power2.in",
    onComplete: done,
  });
};
</script>

<template>
  <div class="flex overflow-hidden rounded-lg" :style="style.card">
    <!-- 左侧信息 -->

    <div
      class="relative flex flex-col justify-between basis-5/12"
      :style="style.leftWrapper"
    >
      <RandomSvg
        v-if="svg"
        class="absolute -z-[1] top-0 left-0 w-full h-full stroke-[.5em]"
        :style="style.svg"
      />

      <h2 class="p-4 text-2xl font-bold">
        {{ dir.name }}
      </h2>

      <div class="flex flex-col p-2 text-xs text-right opacity-70">
        <p>{{ dir.children.length }} 份文件</p>
        <p>更新于 {{ dayjs(dir.mtime).format("YY/MM/DD") }}</p>
        <p>创建于 {{ dayjs(dir.birthtime).format("YY/MM/DD") }}</p>
      </div>
    </div>

    <!-- 右侧列表 -->

    <ul
      class="w-full max-h-[100%-2rem] pl-2 pr-4 my-4 text-sm basis-7/12 scrollbar"
    >
      <li v-for="child in dir.children" :key="child.name">
        <!-- 文件夹 -->

        <div
          v-if="child.type === 'dir'"
          class="p-2 truncate rounded-md cursor-pointer hover:bg-opacity-40 hover:bg-white"
          @click="childCard = child"
        >
          <DirIcon
            class="inline-block w-4 align-text-top stroke-2"
            :style="style.dirIcon"
          />
          {{ child.name }}
        </div>

        <!-- 文件 -->

        <RouterLink
          :to="child.url"
          v-else
          class="block p-2 truncate rounded-md cursor-pointer hover:bg-opacity-40 hover:bg-white"
        >
          <span
            class="inline-block w-2 mx-1 h-[3px] mb-[.2em] rounded-full"
            :style="style.docIcon"
          ></span>
          {{ child.name }}
        </RouterLink>
      </li>
    </ul>

    <!-- 子卡片 -->
    <Transition
      @before-enter="childCardBeforeEnter"
      @enter="childCardEnter"
      @leave="childCardLeave"
    >
      <div
        v-if="childCard"
        class="absolute inset-0 flex h-full overflow-hidden bg-slate-300 dark:bg-slate-700"
      >
        <!-- 返回按钮 -->

        <div
          class="flex-grow-0 flex-shrink-0 h-full pt-2 overflow-hidden text-red-300 cursor-pointer basis-6 hover:text-red-400"
          @click="childCard = null"
        >
          <span>
            <EnterIcon class="w-full rotate-180" />
          </span>
          <span
            class="block w-24 text-sm leading-6 truncate origin-bottom-left rotate-90 -translate-y-6"
            >{{ dir.name }}</span
          >
        </div>

        <!-- 右侧子卡片 -->

        <DirCard :dir="childCard" class="flex-grow h-full" />
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
