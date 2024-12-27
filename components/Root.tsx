import { useLocation } from "@/hooks/useLocation";
import { type WatchData, getWatchData } from "@/libraries/nico/watch";
import { useEffect, useState } from "react";
import { Background } from "./Background";
import { Menu } from "./Menu";
import { Poster } from "./Poster";
import { Table } from "./Table";

export const Root = () => {
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [watchId, setWatchId] = useState<string | null>(null);
  const [watchData, setWatchData] = useState<WatchData | null>(null);
  const location = useLocation();
  useEffect(() => {
    const match = location.match(
      /https:\/\/www.nicovideo\.jp\/watch\/([a-zA-Z0-9]+)/
    );
    if (match?.[1]) {
      setWatchId(match[1]);
      const fetchWatchData = async () => {
        const data = await getWatchData(match[1]);
        setWatchData(data);
      };
      void fetchWatchData();
    } else {
      setWatchId(null);
    }
  }, [location]);
  if (!watchId || !watchData) return <></>;
  if (!watchData.video.viewer.isOwner) return <></>;
  return (
    <>
      <Menu
        watchId={watchId}
        editorOpen={editorOpen}
        setEditorOpen={setEditorOpen}
      />
      {editorOpen && (
        <>
          <Background />
          <Table setEditorOpen={setEditorOpen} />
          <Poster />
        </>
      )}
    </>
  );
};
