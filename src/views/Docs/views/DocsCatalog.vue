<script setup lang="ts">
import { Dir, Doc } from "@/types";
import DirCard from "@/components/common/DirCard.vue";
import { data as docs } from "@/api/docsApi.ts";
import Statistics from "../components/Statistics.vue";

const dirs: Dir[] = [];
const otherDocs: Dir = {
    // 存放没有分类的文档
    name: "未分类",
    children: [],
    type: "dir",
    mtime: Date.now(),
    birthtime: Date.now(),
};
docs.children.forEach((d: Doc | Dir) => {
    if (typeof (d as Dir).children !== "undefined") {
        dirs.push(d as Dir);
    } else {
        otherDocs.children.push(d as Doc);
    }
});
dirs.push(otherDocs);


</script>

<template>
    <div>
        <Statistics class="row-span-2 overflow-y-auto" />
        <div class="grid grid-flow-row-dense grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
            <DirCard v-for="(dir, index) in dirs" :dir="dir" :svg="true" :key="index"
                :class="`row-span-${Math.ceil(dir.children.length / 3)}`" class="shadow-lg" />
        </div>
        <div class="fixed grid none">
            <span class="row-span-1"></span>
            <span class="row-span-2"></span>
            <span class="row-span-3"></span>
            <span class="row-span-4"></span>
            <span class="row-span-5"></span>
        </div>
    </div>
</template>

<style scoped></style>
