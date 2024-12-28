import { createPortal } from "react-dom";

export const Background = () => {
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 5,
        pointerEvents: "auto",
      }}
    />,
    document.body
  );
};
