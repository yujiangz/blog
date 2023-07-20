<script setup lang='ts'>
import Projects from '@/assets/data/projects.json';
import { gsap } from 'gsap';
import { onMounted, shallowRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goProject = async (title: string) => {
    router.push({
        path: `/projects/${title}`
    })
}

const containerRef = shallowRef<HTMLElement | null>(null);
onMounted(() => {
    if (!containerRef.value) return;
    const children = containerRef.value.children;
    [...children].forEach((element, index) => {
        gsap.from(element, {
            y: '20%',
            opacity: 0,
            duration: 0.5,
            delay: 0.3 * index
        })
    });
})

// 其他动画
const elementGsap = (ele: Element | any, options: gsap.TweenVars) => {
    if (!ele) return;
    gsap.from(ele, {
        ...options,
        duration: options.duration ? options.duration : 0.5,
    })
}

</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen gap-8 p-8" ref="containerRef">
        <section v-for="project, index in Projects" :key="index"
            class=" flex flex-col-reverse gap-4 w-full sm:flex-row-reverse max-w-[700px] shadow-lg glass p-4 rounded-lg border-2 border-slate-300/50 ">
            <div class="flex-1 space-y-4">
                <h2 class="text-lg font-bold grow-[.5fr]">#&ensp;{{ project.title }}</h2>
                <div class="text-sm dark:text-slate-200 [&_a]:text-sky-400 leading-6 indent-8" v-html="project.description">
                </div>
                <button v-if="!project.nomore" @click="goProject(project.title)"
                    class="relative p-2 text-xs text-white rounded-sm bg-slate-900 hover:bg-slate-700">
                    <span class="absolute flex w-2 h-2 -top-1 -right-1">
                        <span
                            class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                        <span class="relative inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
                    </span>
                    了解更多
                </button>
            </div>
            <div class="relative flex-1 pb-4 pl-4">
                <img :src="project.pcPic" class="border-2 rounded-md border-slate-300/60"
                    :ref="(ele) => elementGsap(ele, { y: '50%', duration: 0.6, delay: 0.3 * index })" />
                <img v-if="project.phonePic" :src="project.phonePic"
                    class="absolute bottom-0 left-0 border-2 rounded-md border-slate-300/60 h-2/3"
                    :ref="(ele) => elementGsap(ele, { x: '-100%', duration: 0.85, delay: 0.3 * index })" />
            </div>
        </section>
    </div>
</template>