import { defineStore } from "pinia";
import { AppHeaderState } from "../../types";

export default defineStore("AppHeader", {
  state: (): AppHeaderState => ({
    title: "张航的主页",
    show: true,
  }),
  actions: {
    setTitle(newTitle: string) {
      this.title = newTitle ? newTitle : "张航的主页";
    },
    setShow(newShow: boolean) {
      this.show = newShow !== undefined ? newShow : !this.show;
    },
  },
});
