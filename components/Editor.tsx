import { getElements } from "@/libraries/elements";
import { Background } from "./Background";
import { Poster } from "./Poster";
import { Table } from "./Table";

export const Editor = () => {
  useEffect(() => {
    const setup = async () => {
      const elements = await getElements();
      elements.playerDivElement.style.zIndex = "6";
    };
    void setup();
    return () => {
      const cleanup = async () => {
        const elements = await getElements();
        elements.playerDivElement.style.zIndex = "";
      };
      void cleanup();
    };
  }, []);
  return (
    <>
      <Background />
      <Table />
      <Poster />
    </>
  );
};
