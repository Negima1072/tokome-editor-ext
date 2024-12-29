import {
  commentsAtom,
  commentsChangedAtom,
  editorOpenAtom,
  elementsAtom,
  watchDataAtom,
} from "@/libraries/atoms";
import { getUpdateKey, updateOwnerComment } from "@/libraries/nico/comment";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import { JsonEditor } from "./JsonEditor";
import styled from "./Table.module.scss";
import { TableEditor } from "./TableEditor";

export const Table = () => {
  const [commentsChanged, setCommentsChanged] = useAtom(commentsChangedAtom);
  const [isSaving, setIsSaving] = useState(false);
  const [editorMode, setEditorMode] = useState<"table" | "json">("table");
  const elements = useAtomValue(elementsAtom);
  const watchData = useAtomValue(watchDataAtom);
  const setEditorOpen = useSetAtom(editorOpenAtom);
  const comments = useAtomValue(commentsAtom);
  const handleCloseButton = () => {
    setEditorOpen(false);
  };
  const handleEditorModeButton = () => {
    if (editorMode === "json") {
      setEditorMode("table");
    } else {
      setEditorMode("json");
    }
  };
  const handleSaveButton = async () => {
    if (!watchData || !comments || isSaving) return;
    setIsSaving(true);
    try {
      const updateKey = await getUpdateKey(
        watchData.comment.nvComment.params.targets.filter((target) => {
          return target.fork === "owner";
        })[0].id
      );
      if (!updateKey) throw new Error("UpdateKey is unavailable");
      await updateOwnerComment(watchData, updateKey, comments);
      setCommentsChanged(false);
    } catch (e) {
      let message = "Unknown error";
      if (e instanceof Error) {
        message = e.message;
      }
      alert(`コメントを保存できませんでした: ${message}`);
    }
    setIsSaving(false);
  };
  if (!elements || !comments) return <></>;
  return createPortal(
    <div className={styled.container}>
      <div className={styled.controls}>
        <span>{comments.length}/1000</span>
        <button
          type="button"
          className={styled.editorModeButton}
          onClick={handleEditorModeButton}
        >
          {editorMode === "table" ? "JSONエディタ" : "テーブルエディタ"}
        </button>
        <Button onClick={handleCloseButton}>閉じる</Button>
        <Button
          colorType="blue"
          disabled={comments.length > 1000 || isSaving || !commentsChanged}
          onClick={handleSaveButton}
        >
          保存
        </Button>
      </div>
      <div className={styled.table}>
        {editorMode === "table" && (
          <TableEditor onChange={() => setCommentsChanged(true)} />
        )}
        {editorMode === "json" && (
          <JsonEditor
            onSave={() => {
              setEditorMode("table");
              setCommentsChanged(true);
            }}
          />
        )}
      </div>
    </div>,
    elements.sidebarElement
  );
};
