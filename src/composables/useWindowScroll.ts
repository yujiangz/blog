import { onMounted, onUnmounted, ref } from "vue";

export function useWindowScroll() {
  const dropdown = ref<boolean>(false);

  const previousScrollY = ref<number>(0);
  const handleDropdown = () => {
    if (previousScrollY.value < window.scrollY) {
      dropdown.value = true;
    } else {
      dropdown.value = false;
    }

    previousScrollY.value = window.scrollY;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleDropdown);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleDropdown);
  });

  return {
    dropdown,
  };
}
