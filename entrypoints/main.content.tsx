import { Root } from "@/components/Root";
import { createMenuElement, getElements } from "@/libraries/elements";
import { createRoot } from "react-dom/client";

export default defineContentScript({
  matches: ["https://www.nicovideo.jp/watch/*"],
  runAt: "document_start",
  world: "MAIN",
  main() {
    const init = async () => {
      const elements = await getElements();

      const MenuElement = createMenuElement();
      elements.mainSectionElement.before(MenuElement);

      const root = document.createElement("div");
      document.body.append(root);
      createRoot(root).render(<Root />);
    };
    void init();
  },
});
