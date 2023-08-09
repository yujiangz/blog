<script setup lang="ts">
import { Article } from "@/types";
import { getParentByUrl } from "@/api/docsApi.ts";
import AppDoc from "@/components/AppDoc.vue";

import { reactive, watchEffect } from "vue";
import { useRoute } from "vue-router";
import RelatedDocs from "../components/RelatedDocs.vue";
import { getDocPath } from "@/utils/doc";

const article = reactive<Article>({
    title: "",
    path: "",
    folder: null,
});

const route = useRoute();
watchEffect(async () => {
    if (!route.fullPath.includes("/docs/") || route.fullPath == "/docs/catalog")
        return;
    const path = route.fullPath;
    const p = decodeURIComponent(path);
    article.title = p.split("/").pop() || "";
    article.path = getDocPath(p);
    article.folder = getParentByUrl(p);
});
</script>

<template>
    <div class="flex justify-center min-h-screen gap-8 mx-auto self-mode sm:px-4 md:px-8">

        <!-- 相关文档 -->

        <section class="sticky hidden max-h-screen top-16 md:block">
            <h2 class="py-1 font-bold">相关文档</h2>
            <RelatedDocs :dir="article.folder" class="text-sm min-h-[360px] " />
        </section>

        <!-- 文档 -->

        <AppDoc :path="article.path" :title="article.title" class="max-w-3xl overflow-x-hidden grow" />
    </div>
</template>
