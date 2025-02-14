import { useAtom } from "jotai";

import { commentsAtom } from "@/libraries/atoms";
import { comments2json, isSafeJson, json2comments } from "@/libraries/json";

import styled from "./JsonEditor.module.scss";

interface Props {
  onSave: () => void;
}

export const JsonEditor = (props: Props) => {
  const [comments, setComments] = useAtom(commentsAtom);
  const [jsonText, setJsonText] = useState(comments2json(comments || []));
  const jsonApplicable = useMemo(() => {
    return isSafeJson(jsonText);
  }, [jsonText]);
  const handleApply = () => {
    setComments(json2comments(jsonText));
    props.onSave();
  };
  if (!comments) return <></>;
  return (
    <>
      <div className={styled.container}>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck={false}
          wrap="off"
        />
      </div>
      <div className={styled.buttons}>
        <Button
          colorType="blue"
          disabled={!jsonApplicable}
          onClick={handleApply}
        >
          JSONを反映
        </Button>
      </div>
    </>
  );
};
