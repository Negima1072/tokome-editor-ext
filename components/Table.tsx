import { commentsAtom, editorOpenAtom, elementsAtom } from "@/libraries/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import styled from "./Table.module.scss";
import { TableEditor } from "./TableEditor";

export const Table = () => {
  const elements = useAtomValue(elementsAtom);
  const setEditorOpen = useSetAtom(editorOpenAtom);
  const comments = useAtomValue(commentsAtom);
  const handleCloseButton = () => {
    setEditorOpen(false);
  };
  if (!elements || !comments) return <></>;
  return createPortal(
    <div className={styled.container}>
      <div className={styled.controls}>
        <span>{comments.length}/1000</span>
        <Button type="button" onClick={handleCloseButton}>
          閉じる
        </Button>
        <Button type="button">保存</Button>
      </div>
      <div className={styled.table}>
        <TableEditor />
      </div>
    </div>,
    elements.sidebarElement
  );
};
