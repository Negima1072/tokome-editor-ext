import { useLocation } from "@/hooks/useLocation";
import { editorOpenAtom, elementsAtom, watchDataAtom } from "@/libraries/atoms";
import { getElements } from "@/libraries/elements";
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
  const [watchId, setWatchId] = useState<string | null>(null);
  useEffect(() => {
    const match = location.match(
      /https:\/\/www.nicovideo\.jp\/watch\/([a-zA-Z0-9]+)/
    );
    if (match?.[1]) {
      setWatchId(match[1]);
      const setup = async () => {
        setElements(await getElements());
        const data = await getWatchData(match[1]);
        setWatchData(data);
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
