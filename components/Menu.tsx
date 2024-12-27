import { useCallback } from "react";
import ReactDOM from "react-dom";

interface Props {
  watchId: string;
  editorOpen: boolean;
  setEditorOpen: (val: boolean) => void;
}

export const Menu = ({ watchId, editorOpen, setEditorOpen }: Props) => {
  const MenuElement = document.getElementById("tokome:menu");
  const handleOpenEditor = useCallback(() => {
    if (!editorOpen) {
      setEditorOpen(true);
    }
  }, [editorOpen, setEditorOpen]);
  if (!MenuElement) return <></>;
  return ReactDOM.createPortal(
    <div>
      <button type="button" onClick={handleOpenEditor}>
        投コメエディタを開く
      </button>
      <span>{watchId}</span>
    </div>,
    MenuElement
  );
};
