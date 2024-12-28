import { commentsAtom, elementsAtom } from "@/libraries/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import type { ChangeEvent } from "react";
import { createPortal } from "react-dom";
import styled from "./Poster.module.scss";

export const Poster = () => {
  const [command, setCommand] = useState("");
  const [comment, setComment] = useState("");
  const elements = useAtomValue(elementsAtom);
  const setComments = useSetAtom(commentsAtom);
  const handleCommandChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setCommand(ev.target.value);
  };
  const handleCommentChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(ev.target.value);
  };
  const handlePostButtonClick = () => {
    if (!elements) return;
    setComments((prev) => {
      let idx = 0;
      return [
        ...(prev || [])
          .sort((a, b) => a.no - b.no)
          .map((cm) => {
            idx++;
            return {
              ...cm,
              no: idx,
            };
          }),
        {
          body: comment,
          commands: command.split(" "),
          vposMs: Math.floor(elements.videoElement.currentTime * 1000),
          no: idx + 1,
        },
      ];
    });
    setComment("");
  };
  if (!elements) return <></>;
  return createPortal(
    <div className={styled.container}>
      <input
        type="text"
        value={command}
        onChange={handleCommandChange}
        placeholder="コマンド"
        maxLength={124}
      />
      <textarea
        maxLength={1024}
        value={comment}
        onChange={handleCommentChange}
        rows={1}
        placeholder="投稿者コメントを入力"
      />
      <button
        type="button"
        disabled={comment.length === 0}
        onClick={handlePostButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="w_x3 h_x3"
        >
          <path
            fill-rule="evenodd"
            d="M19.16 13.07 6.92 19.82l-.6.18C5.61 20 5 19.47 5 18.76v-4.72c0-.26.26-.53.52-.62l8.66-.98c.26 0 .43-.17.43-.44q-.02-.42-.43-.44l-8.66-.98A.6.6 0 0 1 5 9.96V5.24C5 4.54 5.61 4 6.31 4c.26 0 .53 0 .7.18l12.24 6.75c.34.27.6.63.6 1.07s-.26.89-.7 1.07"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>,
    elements.posterDivElement
  );
};
