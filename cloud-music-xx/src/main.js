import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//饿了么ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//图片懒加载
import VueLazyload from "vue-lazyload";

//播放器
import APlayer from "@moefe/vue-aplayer";

Vue.use(ElementUI);

Vue.use(APlayer, {
  defaultCover: "https://github.com/u3u.png",
  productionTip: true,
});

Vue.use(VueLazyload, {
  loading: require("assets/img/common/loadImg.png"),
});

Vue.config.productionTip = false;
//事件总线
Vue.prototype.$bus = new Vue({});
//格式化时间

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
