<script setup lang='ts'>
import { getSortedDocs } from '@/api/docsApi';
import RandomSvg from '@/components/common/RandomSvg.vue';
import { Doc } from '@/types';
import { getColorCode } from '@/utils/decoration';
import dayjs from 'dayjs';
import { onMounted, shallowRef, watch } from 'vue';

// 最近更新
const COUNT = 3; // 最近更新和历史记录的显示数量
const HISTORYCOUNT = 5;
const data: Doc[] = getSortedDocs(COUNT);

// 点击更多
const ContainerRef = shallowRef<Element | null>(null)
const clickMore = () => {
    const d = ContainerRef.value as Element as HTMLElement
    window.scrollTo({ top: d.clientHeight + d.offsetTop, behavior: 'smooth' })
}

// cache 处理
const cacheArr = shallowRef<Response[]>([]);
const history = shallowRef<{
    url: string;
    title: string;
}[]>([]);
onMounted(async () => {
    if (!('caches' in window)) return;
    const hasCaches = await caches.has('interface-cache')
    if (!hasCaches) return;
    const cache = await caches.open('interface-cache');
    const responses = await cache.matchAll();
    cacheArr.value = responses.slice(-1 * HISTORYCOUNT).reverse();
})
watch(cacheArr, (c) => {
    history.value = c.map(res => {
        const mdUrl = decodeURIComponent(res.url) as string;
        const url = mdUrl.includes('/docs/') ? mdUrl.slice(mdUrl.lastIndexOf('/docs/'), -3) : mdUrl.slice(mdUrl.indexOf('/projects/'), -3);
        const title = mdUrl.slice(mdUrl.lastIndexOf('/') + 1, -3);
        return {
            url,
            title
        }
    });
})


// 清除所有 caches
const removeCache = async (url: string, all: boolean = false) => {
    const hasCaches = await caches.has('interface-cache');
    if (!hasCaches) return;
    const cache = await caches.open('interface-cache');
    if (all) {
        await cache.keys().then(keys => {
            keys.forEach(k => cache.delete(k));
        })
        cacheArr.value = [];
        return;
    };
    cache.delete(url);
    // cacheArr 需要更新
}

</script>

<template>
    <div class="flex flex-col sm:flex-row" ref="ContainerRef">
        <section class="flex-1 p-4">
            <h2 class="py-2 text-lg">最近更新</h2>
            <ul class="flex-1 space-y-3">
                <li v-for="doc, index in data" :key="index" class="relative">

                    <RandomSvg class="absolute top-0 left-0 w-full h-full stroke-[.8em]" :view-box-w="200" :view-box-h="100"
                        :style="{ color: getColorCode() + 'aa' }" />

                    <router-link :to="doc.url"
                        class="relative z-10 items-center justify-between block py-4 text-center border rounded-md shadow-md cursor-pointer border-white/40 group">
                        <p class="py-3 text-lg truncate transition-colors duration-300 bg-white/10 group-hover:bg-white/40">{{ doc.name }}</p>
                        <p class="text-xs opacity-70 ">{{ dayjs(doc.mtime).format("YYYY年MM月DD日") }}</p>
                    </router-link>
                </li>
            </ul>
            <button @click="clickMore"
                class="block w-full p-1 mt-3 text-sm text-center border-2 rounded-md shadow-md border-white/40 glass active:bg-white/40">更多</button>
        </section>
        <section class="flex flex-col flex-1 p-4" v-if="history.length != 0">
            <h2 class="py-2 text-lg">
                最近阅读
            </h2>
            <ul class="flex-1">
                <li>
                <li v-for="doc, index in history" :key="index">
                    <router-link :to="doc.url"
                        class="flex items-center justify-between p-1 rounded-md cursor-pointer hover:bg-white/40">
                        <span class="truncate grow-1 ">{{ doc.title }}</span>
                    </router-link>
                </li>
                </li>
            </ul>
            <button
                class="block p-1 ml-auto text-sm text-center border-2 rounded-md border-white/40 glass active:bg-white/40"
                @click="removeCache('\/docs\/|\/projects\/', true)">
                清空记录
            </button>
        </section>
        <section class="flex flex-col flex-1 p-4" v-else>
            <h2 class="py-2 text-lg">提示</h2>
            <div class="flex flex-col justify-center flex-1 text-sm opacity-70 indent-8">
                <p>为了您的访问体验，本站将进行一些必要的本地存储，本站并不会获取和存储您在本站上的任何操作。更多内容请查看<router-link to="/projects/我的主页"
                        class="text-sky-400">我的主页</router-link>的存储部分。
                </p>
                <br />
                <p>阅读记录将被缓存，如果是在浏览器的无痕模式下，则缓存功能会被禁用。</p>
                <p>搜索内容将被持久化存储在本地，如果是在无痕模式下，退出浏览器后，此次存储将被清空。</p>
                <br />
                <p>如果存在阅读记录和搜索记录，你都可以在相应的显示位置找到清除等字样的按钮。</p>
                <br />
                <p>在您访问本站文档后，不再显示该提示。</p>
            </div>
        </section>
    </div>
</template>