import { atom } from "jotai";
import type { Elements } from "./elements";

export const editorOpenAtom = atom<boolean>(false);
export const elementsAtom = atom<Elements | null>(null);
export const watchDataAtom = atom<WatchData | null>(null);
export const commentsAtom = atom<MiniComment[] | null>(null);
