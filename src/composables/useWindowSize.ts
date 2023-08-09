import { onMounted, onUnmounted, ref } from "vue";

export function useWindowSize() {
  const clientWidth = ref<number>(0);
  const clientHeight = ref<number>(0);

  function update() {
    clientWidth.value = window.innerWidth || document.documentElement.clientWidth;
    clientHeight.value = window.innerHeight || document.documentElement.clientHeight;
  }

  update();

  onMounted(() => {
    window.addEventListener("resize", update);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", update);
  });

  return {
    clientWidth,
    clientHeight,
  };
}
