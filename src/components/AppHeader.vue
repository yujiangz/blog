<script setup lang="ts">
import useAppHeader from "../store/modules/useAppHeader";
import { nextTick, shallowRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppSearch from "./AppSearch.vue";
import ChangeTheme from "./common/ChangeTheme.vue";
import { useWindowScroll } from "@/composables/useWindowScroll";
import { gsap } from "gsap";

interface NavItem {
    name: string;
    path: string;
}

const store = useAppHeader();

const route = useRoute();
const router = useRouter();
const navNames = ((): NavItem[] => {
    const names: NavItem[] = [];
    router.getRoutes().forEach((route) => {
        if (route.meta && typeof route.meta.nav === "string") {
            names.push({
                name: route.meta.nav,
                path: route.path
            });
        }
    });
    return names;
})();

// 路由导航切换
const navRef = shallowRef<HTMLLIElement[] | null>(null);
const navBarRef = shallowRef<HTMLElement | null>(null);
watch(() => route.path, async (p) => {
    const base = p.split('/')[1]

    // 标题切换
    if (navNames.some(nav => {
        return nav.path.split('/')[1] === base;
    })) {
        store.titleInit();
    }

    // navBar
    await nextTick();
    if (!navRef.value || !navBarRef.value) return;
    const el = navRef.value[navNames.findIndex(nav => nav.path.split('/')[1] === base)];
    const bar = navBarRef.value;
    gsap.to(bar, {
        width: el.clientWidth + 'px',
        height: el.clientHeight + 'px',
        top: el.offsetTop + 'px',
        left: el.offsetLeft + 'px',
        duration: 0.2
    })
}, { immediate: true })

// 导航 显示 / 隐藏
const { dropdown } = useWindowScroll();
// const onEnter = (el: Element) => {

//     gsap.to(el, { y: '0%', opacity: 1, duration: 0.1 });
// }
// const onLeave = (el: Element, done: () => void) => {
//     gsap.to(el, { y: '-100%', opacity: 0, onComplete: done })
// }

</script>

<template>
    <Transition>

        <div class="flex items-center justify-between w-full gap-1 select-none xs:gap-2" v-show="!dropdown">

            <!-- 标题 -->

            <h1 class="p-3 font-bold truncate rounded-r-full shadow-lg xs:px-4 text-md glass">
                {{ store.title }}
            </h1>

            <!-- 搜索 / 模式 -->

            <span class="flex-grow"></span>
            <div class="flex items-center gap-2 p-1 rounded-full shadow-lg xs:gap-4 glass">
                <AppSearch class="w-6 icon" />
                <ChangeTheme class="w-6 icon" />
            </div>

            <!-- 导航 -->

            <nav class="relative m-2 rounded-full shadow-lg glass">
                <div class="absolute z-10 transition-all duration-300 rounded-full shadow-md glass" ref="navBarRef">
                </div>
                <ul class="relative z-20 flex p-2 flex-nowrap xs:px-3">
                    <li v-for="nav in navNames" :key="nav.name" class="px-3 py-1 text-xs truncate" ref="navRef">
                        <router-link :to="nav.path">{{ nav.name }}</router-link>
                    </li>
                </ul>
            </nav>
        </div>

    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: transform 0.3s ease, opacity 0.1s;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}
</style>