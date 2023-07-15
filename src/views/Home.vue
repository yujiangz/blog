<script setup lang="ts">
import AppBg from "@/components/AppBg.vue";
import { EmailIcon, GithubIcon } from "@/components/icon";
import useAppHeader from "@/store/modules/useAppHeader";
import { gsap } from "gsap";
import { ref, onMounted } from "vue";

const RefContainer = ref<HTMLElement | null>(null);
const RefContact = ref<HTMLElement | null>(null);

const headerStore = useAppHeader();
headerStore.setTitle("张航");

onMounted(() => {
  gsap.set(RefContainer.value, { opacity: 0, y: 20 });
  gsap.to(RefContainer.value, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    delay: 0.1,
    ease: "power2.out",
  });

  const contactChildren = RefContact.value?.children;
  if (!contactChildren) return;
  const len = contactChildren.length;
  for (let i = 0; i < len; i++) {
    const child = contactChildren[i];
    gsap.fromTo(
      child,
      { y: 0 },
      {
        y: -7,
        duration: 0.3,
        repeat: 3,
        delay: 0.6 + i * 0.3,
        yoyo: true,
        ease: "power2.out",
      }
    );
  }
});
</script>

<template>
  <AppBg />
  <div
    class="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)] p-4"
  >
    <div
      class="w-1/2 p-4 rounded-lg glass min-w-[300px] shadow-lg space-y-6"
      ref="RefContainer"
    >
      <h2 class="text-2xl font-bold">张航的主页</h2>
      <div class="text-sm">
        <div class="float-left mx-2">
          <img
            src="/favicon.ico"
            alt="age"
            class="block w-12 border-2 rounded-full shadow"
          />
        </div>
        <p>“多情自古空余恨，好梦由来最易醒。”</p>
        <p class="text-xs opacity-50">
          "From ancient times to modern times, passionate people finally have
          only regret. It's like, whenever I'm about to indulge in a dream, I
          always wake up unhappily."
        </p>
      </div>

      <!-- 联系方式 -->
      <div
        class="flex items-center clear-both gap-2 p-1 rounded-full glass w-fit"
        ref="RefContact"
      >
        <a
          href="mailto:lingyou.ly@outlook.com"
          class="shadow-md icon hover:text-sky-500 dark:hover:text-sky-300"
        >
          <EmailIcon class="w-6 h-6" />
        </a>
        <a
          href="#"
          class="shadow-md hover:text-sky-500 dark:hover:text-sky-300 icon"
        >
          <GithubIcon class="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
