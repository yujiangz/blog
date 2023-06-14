<script setup lang="ts">
import { Article } from "@/types";
import { getParentByUrl } from "@/assets/data/docsApi";
import AppDoc from "@components/AppDoc.vue";

import { reactive, watchEffect } from "vue";
import { useRoute } from "vue-router";
import RelatedDocs from "./RelatedDocs.vue";

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
  <div class="flex pt-[60px] min-h-screen sm:px-4 md:px-8">
    <!-- 相关文档 -->
    <div class="hidden sticky top-[60px] max-h-screen basis-1/6 md:block">
      <RelatedDocs :dir="article.folder" class="text-sm min-h-[360px]" />
    </div>
    <!-- 文档 -->
    <div class="flex-grow overflow-hidden basis-5/6">
      <AppDoc :article="article.content" class="p-4"  />
    </div>
  </div>
</template>

<style scoped></style>
