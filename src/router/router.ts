// import { JRoute } from "@/types";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: async () => import("@views/Home.vue"),
    name: "Home",
    meta: {
      nav: "主页",
    },
  },
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/docs",
    component: async () => import("@views/Docs/index.vue"),
    name: "Docs",
    redirect: "/docs/catalog",
    children: [
      {
        path: "/docs/catalog",
        component: async () => import("@views/Docs/DocsCatalog.vue"),
      },
      {
        path: "/docs/:pathMatch(.*)*",
        component: async () => import("@views/Docs/ReadDoc.vue"),
      },
    ],
    meta: {
      nav: "文档",
    },
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});
