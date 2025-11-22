import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
// 引入Element Plus的CSS样式文件
import "element-plus/dist/index.css";

import router from "./router";

const pinia = createPinia();
const app = createApp(App); // 创建 app 实例

app.use(ElementPlus);

// 全局注册所有 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia).use(router).mount("#app");
