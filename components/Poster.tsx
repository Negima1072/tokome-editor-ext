import { createPortal } from "react-dom";

export const Poster = () => {
  return createPortal(<div>poster</div>, document.body);
};
