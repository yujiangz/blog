import { isMobile } from "@/utils/device";
import { ref, Ref, onMounted, onUnmounted, computed } from "vue/dist/vue.js";

interface Options {
  threshold: number;
  touch: boolean;
  pointer: boolean;
}

export default function useTouchPointer(
  dom: HTMLElement,
  xy: "x" | "y",
  onHandleFront: () => void,
  onHandleBack: () => void,
  options: Options = { threshold: 50, touch: true, pointer: true }
) {
  const { threshold, touch, pointer } = options;

  const startX = ref(0);
  const startY = ref(0);
  const endX = ref(0);
  const endY = ref(0);

  const offsetX = computed(() => endX.value - startX.value);
  const offsetY = computed(() => endY.value - startY.value);

  const touchStart = (e: TouchEvent | MouseEvent) => {
    if (e instanceof TouchEvent) {
      startX.value = e.touches[0].clientX;
      startY.value = e.touches[0].clientY;
    } else {
      startX.value = e.clientX;
      startY.value = e.clientY;
    }
  };
  const touchEnd = (e: TouchEvent | MouseEvent) => {
    if (e instanceof TouchEvent) {
      endX.value = e.changedTouches[0].clientX;
      endY.value = e.changedTouches[0].clientY;
    } else {
      endX.value = e.clientX;
      endY.value = e.clientY;
    }
  };
  const touchCancel = () => {
    startX.value = 0;
    startY.value = 0;
    endX.value = 0;
    endY.value = 0;
  };

  function handleEvent(e: TouchEvent | MouseEvent) {
    touchEnd(e);

    const control = (start: Ref, end: Ref) => {
      if (start.value - end.value > threshold) {
        onHandleFront && onHandleFront();
      } else if (end.value - start.value > threshold) {
        onHandleBack && onHandleBack();
      }
    };

    if (xy === "x") {
      control(startX, endX);
    } else {
      control(startY, endY);
    }
  }

  onMounted(() => {
    if (isMobile()) {
      if (!touch) return;
      dom.addEventListener("touchstart", touchStart);
      dom.addEventListener("touchend", handleEvent);
      dom.addEventListener("touchcancel", touchCancel);
    } else {
      if (!pointer) return;
      //   指针事件
      dom.addEventListener("pointerdown", touchStart);
      dom.addEventListener("pointerup", handleEvent);
      dom.addEventListener("pointercancel", touchCancel);
    }
  });

  onUnmounted(() => {
    if (isMobile()) {
      if (!touch) return;
      dom.removeEventListener("touchstart", touchStart);
      dom.removeEventListener("touchend", handleEvent);
      dom.removeEventListener("touchcancel", touchCancel);
    } else {
      if (!pointer) return;
      dom.removeEventListener("pointerdown", touchStart);
      dom.removeEventListener("pointerup", handleEvent);
      dom.removeEventListener("pointercancel", touchCancel);
    }
  });

  return {
    offsetX,
    offsetY,
  };
}
