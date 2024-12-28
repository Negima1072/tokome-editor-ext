import { atom } from "jotai";
import type { Elements } from "./elements";
import type { WatchData } from "./nico/watch";

export const editorOpenAtom = atom<boolean>(false);
export const elementsAtom = atom<Elements | null>(null);
export const watchDataAtom = atom<WatchData | null>(null);
