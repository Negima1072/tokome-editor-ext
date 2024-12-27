import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "投コメエディター",
    permissions: ["cookies"],
    host_permissions: ["https://*.nicovideo.jp/*"],
  },
});
