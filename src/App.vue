<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
    <AppHeader class="fixed top-0 left-0 z-50" />
    <router-view class="min-h-screen transition-[padding] duration-200  backdrop-blur-sm pt-16" />
</template>

<style>
body {
    min-height: 100vh;
    background: url(@/assets/imgs/bg_light.jpg);
    background-size: cover;
    background-attachment: fixed;
    overflow-x: hidden;
    overflow: overlay;
}

.dark body {
    background: url(@/assets/imgs/bg_dark.jpg);
    background-size: cover;
    background-attachment: fixed;
}
</style>
