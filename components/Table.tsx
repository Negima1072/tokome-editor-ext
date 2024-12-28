import { editorOpenAtom, elementsAtom } from "@/libraries/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import styled from "./Table.module.scss";

export const Table = () => {
  const elements = useAtomValue(elementsAtom);
  const setEditorOpen = useSetAtom(editorOpenAtom);
  const handleCloseButton = () => {
    setEditorOpen(false);
  };
  if (!elements) return <></>;
  return createPortal(
    <div className={styled.container}>
      <div className={styled.controls}>
        <Button type="button" onClick={handleCloseButton}>
          閉じる
        </Button>
      </div>
      <div className={styled.table}>table</div>
    </div>,
    elements.sidebarElement
  );
};
