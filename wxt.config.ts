import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "投コメエディター",
    description: "ニコニコ動画に投稿者コメントを編集する機能を追加します。",
    permissions: ["cookies"],
    host_permissions: ["https://*.nicovideo.jp/*"],
  },
});
