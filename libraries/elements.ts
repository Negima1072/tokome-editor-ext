import { sleep } from "./sleep";

export const getSectionElement = async (): Promise<Element> => {
  let count = 0;
  while (count < 300) {
    const sectionElement = document.querySelector("main > div > section");
    count++;
    if (sectionElement === null) {
      await sleep(100);
      continue;
    }
    return sectionElement;
  }
  throw new Error("section element is not found;;");
};

export const createMenuElement = (): HTMLDivElement => {
  const MenuElement = document.createElement("div");
  MenuElement.id = "tokome:menu";
  return MenuElement;
};
