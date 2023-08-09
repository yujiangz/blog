<script setup lang='ts'>
import AppDoc from '@/components/AppDoc.vue';

defineProps<{
    title: string
}>()

</script>

<template>
    <div class="self-mode">
        <div class="p-4 sm:px-8 md:px-16 max-w-[976px] mx-auto">
            <AppDoc :title="title" :path="`/projects/${title}.md`" />
        </div>
    </div>
</template>