<script setup lang="ts">
import { Article } from "@/types";
import { getParentByUrl } from "@/api/docsApi.ts";
import AppDoc from "@/components/AppDoc.vue";

import { reactive, watchEffect } from "vue";
import { useRoute } from "vue-router";
import RelatedDocs from "../components/RelatedDocs.vue";

const article = reactive<Article>({
    title: "",
    content: "",
    folder: null,
});

const route = useRoute();
watchEffect(async () => {
    if (!route.fullPath.includes("/docs/") || route.fullPath == "/docs/catalog")
        return;
    const path = route.fullPath;
    const p = decodeURIComponent(path);
    article.title = p.split("/").pop() || "";
    const res = await fetch(p + ".md");
    article.content = await res.text();
    article.folder = getParentByUrl(p);
});
</script>

<template>
    <div class="flex justify-center min-h-screen mx-auto self-mode sm:px-4 md:px-8">

        <!-- 相关文档 -->

        <div class="sticky hidden max-h-screen top-16 md:block">
            <RelatedDocs :dir="article.folder" class="text-sm min-h-[360px] p-4" />
        </div>

        <!-- 文档 -->

        <div class="flex-grow max-w-5xl overflow-hidden">
            <AppDoc :article="article.content" :title="article.title" class="p-4" />
        </div>
    </div>
</template>

<style scoped></style>
