<script setup lang='ts'>
import AppDoc from '@/components/AppDoc.vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    title: string
}>()
const article = ref('');

onMounted(async () => {
    const res = await fetch(`/projects/${props.title}.md`);
    const text = await res.text();
    article.value = typeof text == 'string' ? text : '';

})

</script>

<template>
    <div class=" self-mode">
        <div class="p-4 sm:px-8 md:px-16 max-w-[976px] mx-auto">
            <AppDoc :article="article" :title="props.title" />
        </div>
    </div>
</template>