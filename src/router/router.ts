// import { JRoute } from "@/types";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: async () => import("@/views/Home.vue"),
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
    path: "/projects",
    component: async () => import("@/views/Projects/index.vue"),
    name: "Projects",
    meta: {
      nav: "项目",
    },
    // children: [
    //   {
    //     path: "/projects/:title",
    //     component: async () => import("@/views/Projects/ReadProject.vue"),
    //     props: true,
    //   },
    // ],
  },

  {
    path: "/projects/:title",
    component: async () => import("@/views/Projects/views/ReadProject.vue"),
    props: true,

  },

  {
    path: "/docs",
    component: async () => import("@/views/Docs/index.vue"),
    name: "Docs",
    redirect: "/docs/catalog",
    children: [
      {
        path: "/docs/catalog",
        component: async () => import("@/views/Docs/views/DocsCatalog.vue"),
      },
      {
        path: "/docs/:pathMatch(.*)*",
        component: async () => import("@/views/Docs/views/ReadDoc.vue"),
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
