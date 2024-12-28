import { sleep } from "./sleep";

export interface Elements {
  mainSectionElement: HTMLElement;
  sidebarElement: HTMLDivElement;
  playerDivElement: HTMLDivElement;
  posterDivElement: HTMLDivElement;
  videoElement: HTMLVideoElement;
}

export const getElements = async (): Promise<Elements> => {
  let count = 0;
  while (count < 300) {
    const mainSectionElement = document.querySelector<HTMLElement>(
      "main > div > section"
    );
    const sidebarElement = document.querySelector<HTMLDivElement>(
      "div.grid-area_\\[sidebar\\]"
    );
    const playerDivElement = document.querySelector<HTMLDivElement>(
      "div.grid-area_\\[player\\] > div > div:has(video)"
    );
    const posterDivElement = document.querySelector<HTMLDivElement>(
      "div.grid-area_\\[player\\] > div > div:has(input)"
    );
    const videoElement = document.querySelector<HTMLVideoElement>("video");
    count++;
    if (
      mainSectionElement === null ||
      sidebarElement === null ||
      playerDivElement === null ||
      posterDivElement === null ||
      videoElement === null
    ) {
      await sleep(100);
      continue;
    }
    return {
      mainSectionElement,
      sidebarElement,
      playerDivElement,
      posterDivElement,
      videoElement,
    };
  }
  throw new Error("section element is not found;;");
};

export const createMenuElement = () => {
  const MenuElement = document.createElement("div");
  MenuElement.id = "tokome:menu";
  return MenuElement;
};

export const getMenuElement = () => {
  const MenuElement = document.getElementById("tokome:menu");
  return MenuElement;
};
