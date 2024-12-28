import {
  commentsAtom,
  editorOpenAtom,
  elementsAtom,
  watchDataAtom,
} from "@/libraries/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import styled from "./Table.module.scss";

export const Table = () => {
  const elements = useAtomValue(elementsAtom);
  const watchData = useAtomValue(watchDataAtom);
  const setEditorOpen = useSetAtom(editorOpenAtom);
  const [comments, setComments] = useAtom(commentsAtom);
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
        <table>a</table>
      </div>
    </div>,
    elements.sidebarElement
  );
};
