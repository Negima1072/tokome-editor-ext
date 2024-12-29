import {
  commentsAtom,
  commentsChangedAtom,
  watchDataAtom,
} from "@/libraries/atoms";
import { getElements } from "@/libraries/elements";
import { getComments } from "@/libraries/nico/comment";
import { useAtomValue, useSetAtom } from "jotai";
import { Background } from "./Background";
import { Poster } from "./Poster";
import { Table } from "./Table";

export const Editor = () => {
  const watchData = useAtomValue(watchDataAtom);
  const setComments = useSetAtom(commentsAtom);
  const setCommentsChanged = useSetAtom(commentsChangedAtom);
  useEffect(() => {
    const setup = async () => {
      if (!watchData) return;
      const elements = await getElements();
      elements.playerDivElement.style.zIndex = "6";
      const commentData = await getComments(watchData, ["owner"]);
      if (commentData?.threads[0]) {
        setComments(commentData.threads[0].comments);
        setCommentsChanged(false);
      }
    };
    void setup();
    return () => {
      const cleanup = async () => {
        const elements = await getElements();
        elements.playerDivElement.style.zIndex = "";
        setComments(null);
        setCommentsChanged(false);
      };
      void cleanup();
    };
  }, [watchData]);
  return (
    <>
      <Background />
      <Table />
      <Poster />
    </>
  );
};
