import { editorOpenAtom } from "@/libraries/atoms";
import { getMenuElement } from "@/libraries/elements";
import { useSetAtom } from "jotai";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import styled from "./Menu.module.scss";

export const Menu = () => {
  const MenuElement = getMenuElement();
  const setEditorOpen = useSetAtom(editorOpenAtom);
  const handleOpenEditor = () => {
    setEditorOpen(true);
  };
  if (!MenuElement) return <></>;
  return createPortal(
    <div>
      <Button
        className={styled.button}
        type="button"
        onClick={handleOpenEditor}
      >
        投コメエディタを開く
      </Button>
    </div>,
    MenuElement
  );
};
