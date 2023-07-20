<script setup lang="ts">
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

import "@/styles/markdown.css";
import "@/styles/highlight.css";

import { gfmHeadingId } from "marked-gfm-heading-id";
import { ref, shallowRef, watch } from "vue";

import { CatalogIcon, CloseIcon } from "./icon";
import { gsap } from "gsap";

import useAppHeader from "@/store/modules/useAppHeader";

const headerStore = useAppHeader();

// marked 配置
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


// 页面
const props = defineProps<{
    title?: string;
    article: string;
}>();

// 设置 header 的标题
watch(
    () => props.title,
    (title) => {
        if (!title) return;
        headerStore.setTitle(title);
    },
    { immediate: true }
);

const html = ref('');

// 标题
const titles = shallowRef<{
    level: number;
    id: string;
    title: string;
}[]>([]);

watch(() => props.article, async (ar) => {
    if (ar == '') return;
    // @ts-ignore
    html.value = await marked.parse(props.article);
    const tits = [];
    const reg = /<h([2-6]) id="(.+)">(.+)<\/h[1-6]>/g;
    let result = reg.exec(html.value);
    while (result) {
        const t = await marked.parseInline(result[3]);
        tits.push({
            level: parseInt(result[1]),
            id: result[2],
            title: t,
        });
        result = reg.exec(html.value);
    }
    titles.value = tits;
});



// const titles = computed<Title[] | undefined>(() => {
//     if (!html.value) return undefined;

//     return titles;
// });
const titleScroll = (level: number, id: string) => {
    const Title = document.querySelector(`h${level}#${id}`);
    Title?.scrollIntoView({
        block: "center",
        behavior: "smooth",
    });
};
const titleShow = ref(false);
const setTitleShow = (show?: boolean) => {
    titleShow.value = show === undefined ? !titleShow.value : show;
};
const onTitlesBeforEnter = (el: Element) => {
    gsap.set(el, { opacity: 0, x: 20 });
};
const onTitlesEnter = (el: Element) => {
    gsap.to(el, { opacity: 1, x: 0, duration: 0.3 });
};
const onTitlesLeave = (el: Element, done: () => void) => {
    gsap.to(el, { opacity: 0, x: 20, duration: 0.3, onComplete: done });
};

const onTitlesBtnBeforeEnter = (el: Element) => {
    gsap.set(el, { opacity: 0, x: 20, rotateZ: 90 });
};
const onTItlesBtnEnter = (el: Element) => {
    gsap.to(el, { opacity: 1, x: 0, rotateZ: 0, duration: 0.3 });
};
const onTitlesBtnLeave = (el: Element, done: () => void) => {
    // 滚动消失
    gsap.to(el, {
        position: "absolute",
        opacity: 0,
        x: -60,
        rotateZ: -180,
        duration: 0.6,
        onComplete: done,
    });
};
</script>

<template>
    <div class="markdown-body">

        <h1 v-if="props.title">{{ props.title }}</h1>

        <div v-html="html" class="tracking-widest xs:px-8"></div>

        <!-- 目录 -->
        <Teleport to="body">
            <TransitionGroup @before-enter="onTitlesBtnBeforeEnter" @enter="onTItlesBtnEnter" @leave="onTitlesBtnLeave"
                tag="div" class="fixed z-40 w-8 h-8 ml-auto mr-0 top-16 right-4">
                <span key="s1" v-show="!titleShow"
                    class="inline-block cursor-pointer icon glass text-sky-500 hover:text-sky-600">
                    <CatalogIcon class="w-full" @click="() => setTitleShow(true)" />
                </span>
                <span key="s2" v-show="titleShow"
                    class="inline-block text-red-400 cursor-pointer stroke-2 glass icon hover:text-red-600">
                    <CloseIcon class="w-full" @click="() => setTitleShow(false)" />
                </span>
            </TransitionGroup>

            <!-- 列表 -->
            <Transition @before-enter="onTitlesBeforEnter" @enter="onTitlesEnter" @leave="onTitlesLeave">
                <div v-show="titleShow"
                    class="fixed p-4 pr-0 text-sm border rounded-md select-none doc-titles top-24 right-4 bg-slate-200/[.97] w-60 dark:bg-slate-800/[.95] border-slate-300 dark:border-slate-600">
                    <span v-if="titles.length == 0" class="">无标题</span>
                    <ul v-else class="scrollbar max-h-[calc(100vh-11rem)] pr-4">
                        <li v-for="title in titles" @click="titleScroll(title.level, title.id)"
                            class="truncate cursor-pointer hover:text-sky-500 text-slate-500 dark:text-slate-400 dark:hover:text-sky-500"
                            :style="{
                                paddingLeft: (title.level - 2) + 'rem',
                                fontSize: '.8rem'
                                // fontSize: 1 - (title.level - 1) / 20 + 'rem',
                            }" v-html="title.title"></li>
                    </ul>
                </div>
            </Transition>
        </Teleport>
    </div>
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
