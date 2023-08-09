import { onMounted, onUnmounted, ref } from "vue";
import { useWindowSize } from "./useWindowSize";

export function useWindowScroll() {
  const dropdown = ref<boolean>(false);
  const { clientHeight } = useWindowSize();
  const threshold = 30;

  const previousScrollY = ref<number>(0);
  const handleDropdown = (value: boolean) => {
    dropdown.value = value;
  };
  const updateDropdown = () => {
    if (Math.abs(previousScrollY.value - window.scrollY) < threshold) return;

    if (
      previousScrollY.value < window.scrollY &&
      window.scrollY > clientHeight.value / 2
    ) {
      dropdown.value = true;
    } else {
      dropdown.value = false;
    }

    previousScrollY.value = window.scrollY;
  };

  onMounted(() => {
    window.addEventListener("scroll", updateDropdown);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", updateDropdown);
  });

  return {
    dropdown,
    handleDropdown,
  };
}
