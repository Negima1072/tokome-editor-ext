import { useLocation } from "@/hooks/useLocation";
import {
  commentsAtom,
  editorOpenAtom,
  elementsAtom,
  watchDataAtom,
} from "@/libraries/atoms";
import { getElements } from "@/libraries/elements";
import { getComments } from "@/libraries/nico/comment";
import { getWatchData } from "@/libraries/nico/watch";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Editor } from "./Editor";
import { Menu } from "./Menu";

export const Root = () => {
  const location = useLocation();
  const setElements = useSetAtom(elementsAtom);
  const editorOpen = useAtomValue(editorOpenAtom);
  const [watchData, setWatchData] = useAtom(watchDataAtom);
  const [comments, setComments] = useAtom(commentsAtom);
  const [watchId, setWatchId] = useState<string | null>(null);
  useEffect(() => {
    const match = location.match(
      /https:\/\/www.nicovideo\.jp\/watch\/([a-zA-Z0-9]+)/
    );
    if (match?.[1]) {
      setWatchId(match[1]);
      const setup = async () => {
        setElements(await getElements());
        const _watchData = await getWatchData(match[1]);
        setWatchData(_watchData);
        const _commentData = await getComments(_watchData, ["owner"]);
        if (_commentData?.threads[0]) {
          setComments(_commentData.threads[0].comments);
        }
      };
      void setup();
    } else {
      setElements(null);
      setWatchId(null);
    }
  }, [location]);
  if (!watchId || !watchData) return <></>;
  if (!watchData.video.viewer.isOwner) return <></>;
  return (
    <>
      <Menu />
      {editorOpen && <Editor />}
    </>
  );
};
