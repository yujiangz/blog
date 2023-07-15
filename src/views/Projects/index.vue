<script setup lang='ts'>
import AppBg from '@/components/AppBg.vue';
import NeteaseCloudMusic from './components/NeteaseCloudMusic.vue'
</script>

<template>
    <AppBg />
    <div class="flex relative z-10 flex-col justify-center items-center w-full min-h-[calc(100vh-80px)] p-4 pt-20 pb-32">
        <NeteaseCloudMusic />
    </div>
</template>