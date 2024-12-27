import { Root } from "@/components/Root";
import { createMenuElement, getSectionElement } from "@/libraries/elements";
import { createRoot } from "react-dom/client";

export default defineContentScript({
  matches: ["https://www.nicovideo.jp/watch/*"],
  runAt: "document_start",
  world: "MAIN",
  main() {
    const initialize = async () => {
      const sectionElement = await getSectionElement();

      const MenuElement = createMenuElement();
      sectionElement.before(MenuElement);

      const RootElement = document.createElement("div");
      document.body.append(RootElement);
      createRoot(RootElement).render(<Root />);
    };
    void initialize();
  },
});
