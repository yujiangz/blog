<script setup lang="ts">
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { gfmHeadingId } from "marked-gfm-heading-id";
import hljs from "highlight.js";

import "@/styles/markdown.css";
import "@/styles/highlight.css";

import { ref, shallowRef, watch, nextTick } from "vue";
import useAppHeader from "@/store/modules/useAppHeader";

import { CatalogIcon, CloseIcon } from "./icon";
import { gsap } from "gsap";
import { useWindowSize } from "@/composables/useWindowSize";



// ==================
// marked 配置
// ==================

marked.use({
    headerIds: false,
    mangle: false,
});

marked.use(gfmHeadingId());

// @ts-ignore
marked.use(markedHighlight({
    async: true,
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        return new Promise<string>((resolve, _reject) => {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            resolve(hljs.highlight(code, { language }).value);
        })
    }
}));

const props = defineProps<{
    title: string;
    path: string
}>();

// ==================
// 设置 header 的标题
// =================

const headerStore = useAppHeader();
watch(
    () => props.title,
    (title) => {
        if (!title) return;
        headerStore.setTitle(title);
    },
    { immediate: true }
);

// =====================
// 文档：获得数据
// =====================

// 内容
const html = ref('');

// 目录
const titles = shallowRef<{
    level: number;
    id: string;
    title: string;
}[]>([]);

watch(() => props.path, async (path) => {

    if (!path.includes('.md')) return;

    const res = await fetch(path);
    const htmlText = await res.text();

    if (!htmlText) return;

    html.value = await (marked.parse(htmlText) as unknown as Promise<string>);
    const tits = [];
    const reg = /<h([2-4]) id="(.+)">(.+)<\/h[2-4]>/g;
    let result = reg.exec(html.value);
    while (result) {
        const t = await (marked.parseInline(result[3]) as unknown as Promise<string>);
        tits.push({
            level: parseInt(result[1]),
            id: result[2],
            title: t,
        });
        result = reg.exec(html.value);
    }
    titles.value = tits;
}, { immediate: true });

// =====================
// 目录 状态：显示 / 隐藏
// =====================

const titleShow = ref(false);
const setTitleShow = (show?: boolean) => {
    titleShow.value = show === undefined ? !titleShow.value : show;
};

// 目录 动画
const onTitlesBeforEnter = (el: Element) => {
    gsap.set(el, { x: '100%' });
};
const onTitlesEnter = (el: Element) => {
    gsap.to(el, { x: 0, duration: 0.3, ease: "back.out(1.5)" });
};
const onTitlesLeave = (el: Element, done: () => void) => {
    gsap.to(el, { x: '100%', duration: 0.2, ease: "power1.out", onComplete: done });
};


// ======================
// 文档阅读进度
// ======================

const { clientHeight } = useWindowSize()
const HtmlRef = shallowRef<HTMLDivElement | null>(null);
const progressActiveID = ref<string>('');
const intersectionObserver = new IntersectionObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].boundingClientRect.y > clientHeight.value / 2) continue;
        progressActiveID.value = entries[i].target.getAttribute('id') || '';
    }
}, { threshold: 1 });
watch(html, async () => {
    await nextTick();
    if (!HtmlRef.value) return;
    intersectionObserver.disconnect();
    HtmlRef.value.querySelectorAll('h2,h3,h4').forEach(h => {
        intersectionObserver.observe(h);
    });
}, { immediate: true });


</script>

<template>
    <article class="transition-transform duration-200" :class="titleShow ? '-translate-x-4' : ''">

        <!-- 文档内容 -->

        <section class="markdown-body">
            <h1 v-if="props.title">{{ props.title }}</h1>
            <div v-html="html" class="px-4 transition-all xs:px-8" ref="HtmlRef"></div>
        </section>

        <!-- 文档目录 -->

        <Teleport to="body">

            <!-- 目录 -->

            <Transition @before-enter="onTitlesBeforEnter" @enter="onTitlesEnter" @leave="onTitlesLeave">
                <section v-show="titleShow && titles.length !== 0"
                    class="p-4 fixed top-20 right-0 text-sm drop-shadow-md rounded-l-md select-none doc-titles bg-slate-200/[.97] w-60 dark:bg-slate-800/[.95]">
                    <h2 class="py-1 font-bold">目录</h2>
                    <ul class="scrollbar max-h-[calc(100vh-11rem)] pr-4">
                        <li v-for="title, index in titles" :key="index">
                            <router-link :to="`#${title.id}`" v-html="title.title"
                                class="block truncate hover:text-sky-500 dark:hover:text-sky-500"
                                :class="progressActiveID == title.id ? 'text-sky-500' : 'text-slate-500 dark:text-slate-400'"
                                :style="{
                                    paddingLeft: (title.level - 2) + 'rem',
                                    fontSize: '.8rem'
                                }"></router-link>
                        </li>
                    </ul>
                </section>
            </Transition>

            <!-- 目录 状态 按钮 -->
            <div class="fixed z-40 w-8 h-8 ml-auto mr-0 top-16 right-4">
                <span key="s1" v-show="!titleShow && titles.length !== 0"
                    class="inline-block cursor-pointer icon glass text-sky-500 hover:text-sky-600">
                    <CatalogIcon class="w-full" @click="() => setTitleShow(true)" />
                </span>
                <span key="s2" v-show="titleShow && titles.length !== 0"
                    class="inline-block text-red-400 cursor-pointer stroke-2 glass icon hover:text-red-600">
                    <CloseIcon class="w-full" @click="() => setTitleShow(false)" />
                </span>
            </div>
        </Teleport>

    </article>
</template>

<style scoped>
.markdown-body {
    box-sizing: border-box;
}

.doc-titles ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
