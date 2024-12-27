import { createPortal } from "react-dom";

interface Props {
  setEditorOpen: (val: boolean) => void;
}

export const Table = ({ setEditorOpen }: Props) => {
  const handleCloseButton = () => {
    setEditorOpen(false);
  };
  return createPortal(
    <div>
      <div>
        <button type="button" onClick={handleCloseButton}>
          閉じる
        </button>
      </div>
      <div>table</div>
    </div>,
    document.body
  );
};
