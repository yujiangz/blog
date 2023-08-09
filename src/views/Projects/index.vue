<script setup lang='ts'>
import Projects from '@/assets/data/projects.json';
import { gsap } from 'gsap';
import { onMounted, onUnmounted, shallowRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goProject = async (title: string) => {
    router.push({
        path: `/projects/${title}`
    })
}

// 图片进入视口的动画
const ImgObserverRef = shallowRef<Element[]>([]);
let intersectionObserver: IntersectionObserver | null;

function imgObserverFun(IMG: Element, init: boolean = false) {
    const imgs = [...IMG.children];
    if (init) {
        imgs.forEach(img => {
            gsap.to(img, { opacity: 0 });
        })
        return;
    }
    imgs.forEach(img => {
        const options = img.getAttribute('data-type') == 'pc' ? { y: '50%', duration: 0.5, ease: 'circ.out' } : { x: '-50%', duration: 0.8, ease: 'back.out(1.8)' };
        gsap.set(img, { opacity: 1 });
        gsap.from(img, { ...options, opacity: 0 });
    })
}

onMounted(() => {
    if (!ImgObserverRef.value.length) return;
    intersectionObserver = new IntersectionObserver((entries) => {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].intersectionRatio <= 0.5) {
                imgObserverFun(entries[i].target, true);
                continue;
            };
            imgObserverFun(entries[i].target);
            intersectionObserver?.unobserve(entries[i].target);
        }
    }, { threshold: [0.5] });
    ImgObserverRef.value.forEach(observer => intersectionObserver!.observe(observer))
})

onUnmounted(() => {
    intersectionObserver = null;
})

</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
        <section v-for="project, index in Projects" :key="index"
            class=" flex flex-col-reverse gap-6 w-full sm:flex-row-reverse max-w-[600px] sm:gap-8 shadow-lg glass p-4 rounded-lg border-2 border-slate-300/50 ">
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
            <div class="relative flex-1 pb-4 pl-4" ref="ImgObserverRef">
                <img :src="project.pcPics[0]" class="block overflow-hidden border-2 rounded-md border-slate-300/60">
                <img v-if="project.phonePics" :src="project.phonePics[0]"
                    class="absolute left-0 block w-auto border-2 rounded-md bottom-4 h-2/3 border-slate-300/60" />

            </div>
        </section>
    </div>
</template>