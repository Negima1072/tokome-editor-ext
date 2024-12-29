import {
  commentsAtom,
  editorOpenAtom,
  elementsAtom,
  watchDataAtom,
} from "@/libraries/atoms";
import { getUpdateKey, updateOwnerComment } from "@/libraries/nico/comment";
import { useAtomValue, useSetAtom } from "jotai";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import styled from "./Table.module.scss";
import { TableEditor } from "./TableEditor";

export const Table = () => {
  const elements = useAtomValue(elementsAtom);
  const watchData = useAtomValue(watchDataAtom);
  const setEditorOpen = useSetAtom(editorOpenAtom);
  const comments = useAtomValue(commentsAtom);
  const handleCloseButton = () => {
    setEditorOpen(false);
  };
  const handleSaveButton = async () => {
    if (!watchData || !comments) return;
    const updateKey = await getUpdateKey(
      watchData.comment.nvComment.params.targets.filter((target) => {
        return target.fork === "owner";
      })[0].id
    );
    if (!updateKey) return;
    const res = await updateOwnerComment(watchData, updateKey, comments);
  };
  if (!elements || !comments) return <></>;
  return createPortal(
    <div className={styled.container}>
      <div className={styled.controls}>
        <span>{comments.length}/1000</span>
        <Button onClick={handleCloseButton}>閉じる</Button>
        <Button
          colorType="blue"
          disabled={comments.length > 1000}
          onClick={handleSaveButton}
        >
          保存
        </Button>
      </div>
      <div className={styled.table}>
        <TableEditor />
      </div>
    </div>,
    elements.sidebarElement
  );
};
