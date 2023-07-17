<script setup lang="ts">
import { AppHeaderState } from "../types";
import useAppHeader from "../store/modules/useAppHeader";
import { shallowReadonly, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppSearch from "./AppSearch.vue";
import ChangeTheme from "./common/ChangeTheme.vue";

interface NavItem {
    name: string;
    path: string;
}

const store = useAppHeader();
const { show } = shallowReadonly<AppHeaderState>({
    title: store.title,
    show: store.show,
});

const route = useRoute();
const router = useRouter();
const navNames = ((): NavItem[] => {
    const names: NavItem[] = [];
    router.getRoutes().forEach((route) => {
        if (route.meta && typeof route.meta.nav === "string") {
            names.push({
                name: route.meta.nav,
                path: route.path,
            });
        }
    });
    return names;
})();

watch(() => route.path, (p) => {
    const k = p.split('/')[1];
    if (navNames.some(nav => {
        return nav.path.split('/')[1] === k;
    })) {
        store.titleInit();
    }
})
</script>

<template>
    <div class="flex items-center justify-between w-full gap-1 select-none xs:gap-2" v-show="show">
        <!-- 标题 -->

        <h1 class="p-3 font-bold truncate rounded-r-full shadow-lg xs:px-4 text-md glass">
            {{ store.title }}
        </h1>

        <!-- 其他项目 -->
        <span class="flex-grow"></span>
        <!-- 搜索 -->
        <div class="flex items-center gap-2 p-1 rounded-full shadow-lg xs:gap-4 glass">
            <AppSearch class="w-6 icon" />
            <ChangeTheme class="w-6 icon" />
        </div>

        <!-- 导航 -->

        <nav class="p-2 m-2 rounded-full shadow-lg xs:px-3 glass">
            <ul class="flex flex-nowrap">
                <li v-for="nav in navNames" :key="nav.name" class="px-3 py-1 text-xs truncate" :class="
                    nav.path.split('/')[1] === route.path.split('/')[1]
                        ? 'rounded-full shadow-md glass'
                        : ''
                ">
                    <router-link :to="nav.path">{{ nav.name }}</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
/* .router-link-active {
  pointer-events: none;
} */
</style>
