<script setup lang="ts">
// 因为按键操作， isPc 应该与 header 的小屏判断并不一样，不用 props
import { SearchDoc } from "@/types.ts";
import {
  SearchIcon,
  CloseIcon,
  EnterIcon,
  HistoryIcon,
  LinkIcon,
} from "./icon/index.ts";

import { isMobile } from "@utils/device";
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import * as docsApi from "@assets/data/docsApi";

import dayjs from "dayjs";

const isPc = !isMobile();

const searchActive = ref<boolean>(false);
const setSearchActive = (value?: boolean) => {
  searchActive.value = value ? value : !searchActive.value;
};

// 搜索功能
interface SearchHistory {
  name: string;
  url: string;
  time: number;
}
const searchValue = ref<string>("");
const resaultItems = ref<SearchDoc[] | SearchHistory[]>([]);
watch(
  searchValue,
  (value) => {
    if (value.trimEnd() == "") {
      const localHistory = localStorage.getItem("searchHistory");
      resaultItems.value = localHistory ? JSON.parse(localHistory) : [];
    } else {
      resaultItems.value = docsApi.searchDoc(value);
    }
  },
  { immediate: true }
);

// 搜索历史也为 resaultItems， 搜索历史的操作：
const addSearchHistory = (name: string, url: string) => {
  const localHistory = localStorage.getItem("searchHistory");
  if (localHistory) {
    const history = JSON.parse(localHistory).filter(
      (item: SearchDoc) => item.url !== url
    );
    history.unshift({ name, url, time: Date.now() });
    if (history.length > 10) history.pop(); // 只保留 10 条
    localStorage.setItem("searchHistory", JSON.stringify(history));
  } else {
    localStorage.setItem(
      "searchHistory",
      JSON.stringify([{ name, url, time: Date.now() }])
    );
  }
};

const removeSearchHistory = (index: number) => {
  resaultItems.value.splice(index, 1);
  localStorage.setItem("searchHistory", JSON.stringify(resaultItems.value));
};

const clearSearchHistory = () => {
  localStorage.removeItem("searchHistory");
  resaultItems.value.length = 0;
};

// 快捷键
const searchItemIndex = ref<number>(0);
watch(searchValue, () => {
  searchItemIndex.value = 0;
});
const searchItemLength = computed(() => resaultItems.value.length);
const router = useRouter();
const linkTo = (name: string, url: string) => {
  addSearchHistory(name, url);
  router.push({
    path: url,
  });
  setSearchActive(false);
  searchValue.value = "";
  searchItemIndex.value = 0;
};
const keys = [
  { name: "esc", tip: "退出" },
  { name: "↑ ↓", tip: "选择" },
  { name: "enter", tip: "确认" },
];
const scrollView = (el: Element) => {
  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};
const handleKeyDown = (e: KeyboardEvent) => {
  const key = e.key.toLowerCase();

    if (e.ctrlKey || key === "enter") {
      e.preventDefault();
    }

    e.stopPropagation();

  switch (key) {
    case "arrowdown":
      searchItemIndex.value =
        (searchItemIndex.value + 1) % searchItemLength.value;
      break;
    case "arrowup":
      searchItemIndex.value =
        (searchItemIndex.value - 1 + searchItemLength.value) %
        searchItemLength.value;
      break;
    case "k":
      if (e.ctrlKey) {
        !searchActive.value && setSearchActive(true);
      }
      break;
    case "escape":
      searchActive.value && setSearchActive(false);
      break;
    case "enter":
      const item = resaultItems.value[searchItemIndex.value];
      if (!item.url) return;
      linkTo(item.name, item.url);
      break;
    default:
      break;
  }
};

const ResaultList = ref<Element | null>(null);
watch(searchItemIndex, (value) => {
  if (value >= 0 && value < searchItemLength.value) {
    const el = ResaultList.value?.children[value] as Element;
    scrollView(el);
  }
});

const SearchInput = ref<HTMLInputElement | null>(null);
watch(searchActive, (value) => {
  if (value) {
    nextTick(() => {
      SearchInput.value?.focus();
    });
  }
});

onMounted(() => {
  if (isPc) {
    window.addEventListener("keydown", handleKeyDown);
  }
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <!-- 占位提示 -->
  <span @click="setSearchActive()" v-bind="$attrs">
    <SearchIcon />
  </span>

  <Teleport to="body">
    <div
      v-show="searchActive"
      class="fixed inset-0 z-50 w-full h-full backdrop-filter backdrop-blur-md"
      @click.self="
        {
          setSearchActive();
          searchValue = '';
        }
      "
    >
      <!-- 卡片 -->
      <div
        v-show="searchActive"
        class="mx-auto mt-12 overflow-hidden rounded-lg w-1/2 min-w-[300px] max-w-[420px] bg-white shadow-lg bg-opacity-40 text-gray-600 dark:bg-gray-800 dark:bg-opacity-75 dark:text-gray-200 border-2 border-slate-200 dark:border-gray-600"
      >
        <!-- header -->
        <div class="relative w-full p-4">
          <input
            type="text"
            v-model="searchValue"
            class="w-full p-2 text-black border border-sky-500 dark:text-white"
            ref="SearchInput"
          />
          <SearchIcon class="absolute w-6 -translate-y-1/2 right-6 top-1/2" />
        </div>

        <!-- 搜索列表 -->
        <div class="p-4 pt-0 text-sm">
          <!-- 搜索提示 -->
          <div class="pb-1 text-xs text-gray-500">
            <div v-show="!searchValue.trim()">
              <div v-if="searchItemLength">
                历史记录
                <span
                  class="float-right cursor-pointer hover:text-red-400"
                  @click="
                    () => {
                      clearSearchHistory();
                    }
                  "
                  >清除</span
                >
              </div>
              <div v-else>暂无记录</div>
            </div>
            <div v-show="searchValue.trim()">
              {{ searchItemLength }}个结果
              <span class="float-right"
                >{{ searchItemIndex + 1 }}/{{ searchItemLength }}</span
              >
            </div>
          </div>
          <!-- 搜索结果 / 搜索历史 -->
          <ul
            class="space-y-2 scrollbar max-h-[calc(100vh-17rem)] pr-2"
            ref="ResaultList"
          >
            <li
              v-for="(item, index) in resaultItems"
              :key="item.url"
              class="my-2 hover:cursor-pointer"
            >
              <div
                :to="item.url ? item.url : '/'"
                class="relative px-3 py-2 border border-gray-200 rounded-md dark:border-gray-600"
                :class="
                  index === searchItemIndex
                    ? 'bg-blue-400 text-white dark:bg-opacity-80'
                    : 'hover:bg-blue-300 hover:text-white'
                "
                @click="
                  {
                    item.url && linkTo(item.name, item.url);
                  }
                "
              >
                <!-- 左侧类型 -->
                <div class="absolute w-6 -translate-y-1/2 top-1/2 left-2">
                  <HistoryIcon v-show="!searchValue.trim()" class="w-full" />
                  <LinkIcon v-show="searchValue" class="w-full" />
                </div>

                <!-- 中间结果 -->
                <div class="flex flex-col flex-grow w-full px-8">
                  <span class="">{{ item.name }}</span>
                  <span
                    v-show="searchValue"
                    class="text-xs truncate opacity-70"
                    >{{ item.url }}</span
                  >
                  <span
                    v-show="!searchValue.trim()"
                    class="text-xs opacity-70"
                    >{{
                      dayjs((item as SearchHistory).time).format(
                        "YY年MM月DD日 HH:mm:ss"
                      )
                    }}</span
                  >
                </div>

                <!-- 右侧操作 -->
                <div
                  class="absolute -translate-y-1/2 top-1/2 right-2 hover:text-red-400 w-fit"
                >
                  <CloseIcon
                    v-show="!searchValue.trim()"
                    class="w-6"
                    @click.stop="removeSearchHistory(index)"
                  />
                  <EnterIcon v-show="searchValue" class="w-6" />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- footer -->
        <div
          class="flex items-center justify-between p-4 text-xs border-t dark:border-t-gray-500"
        >
          <span class="font-bold text-blue-500 text-[1rem]">张航</span>
          <ul v-if="isPc" class="flex gap-4">
            <li v-for="key in keys" :key="key.name">
              <span
                class="inline-block p-1 mr-1 transform scale-75 border rounded-lg"
                >{{ key.name }}</span
              >
              <span>{{ key.tip }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang=""></style>
