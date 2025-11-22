import { resolve } from "path";
import {
  defineConfig,
  externalizeDepsPlugin,
  bytecodePlugin,
} from "electron-vite";
import vue from "@vitejs/plugin-vue";

const publicDir = resolve("resources");
const envDir = resolve("build");

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },
  renderer: {
    publicDir,
    envDir,
    envPrefix: "RENDERER_",
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@store": resolve("src/renderer/src/store"),
        "@api": resolve("src/renderer/src/api"),
        "@view": resolve("src/renderer/src/views"),
        "@router": resolve("src/renderer/src/router"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://uat.crm.xuexiluxian.cn",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [vue()],
  },
});
