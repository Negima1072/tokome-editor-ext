import { commentsAtom } from "@/libraries/atoms";
import { str2time, time2str } from "@/libraries/vpos";
import { useAtom } from "jotai";
import styled from "./TableEditor.module.scss";

interface Props {
  onChange?: () => void;
}

export const TableEditor = (props: Props) => {
  const [comments, setComments] = useAtom(commentsAtom);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [tempTime, setTempTime] = useState<{ [key: number]: string }>({});
  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll && comments) {
      setSelectedRows(new Set(comments.map((comment) => comment.no)));
    } else {
      setSelectedRows(new Set());
    }
  };
  const handleRowSelect = (no: number) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(no)) {
        newSelection.delete(no);
      } else {
        newSelection.add(no);
      }
      return newSelection;
    });
  };
  const handleTimeChange = (no: number, value: string) => {
    setTempTime((prev) => ({ ...prev, [no]: value }));
  };
  const handleTimeBlur = (index: number, no: number) => {
    const tempValue = tempTime[no];
    if (!tempValue) return;
    const newTime = str2time(tempValue);
    if (newTime) {
      setComments((prevComments) => {
        const updatedComments = [...(prevComments || [])];
        updatedComments[index].vposMs = newTime * 1000;
        return updatedComments;
      });
      props.onChange?.();
    }
    setTempTime((prev) => {
      const newTemp = { ...prev };
      delete newTemp[no];
      return newTemp;
    });
  };
  const handleEdit = (
    index: number,
    field: keyof MiniComment,
    value: string
  ) => {
    setComments((prevComments) => {
      const updatedComments = [...(prevComments || [])];
      if (field === "commands") {
        updatedComments[index].commands = value.split(" ");
      } else if (field === "body") {
        updatedComments[index].body = value;
      }
      return updatedComments;
    });
    props.onChange?.();
  };
  const handleDelete = () => {
    setComments((prev) =>
      (prev || []).filter((comment) => !selectedRows.has(comment.no))
    );
    props.onChange?.();
    setSelectedRows(new Set());
  };
  if (!comments) return <></>;
  return (
    <>
      <div className={styled.container}>
        <table>
          <colgroup>
            <col width="25px" />
            <col width="80px" />
            <col width="150px" />
            <col width="250px" />
            <col width="60px" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.size === comments.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>再生時間</th>
              <th>コマンド</th>
              <th>コメント</th>
              <th>番号</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment.no}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(comment.no)}
                    onChange={() => handleRowSelect(comment.no)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      tempTime[comment.no] || time2str(comment.vposMs / 1000)
                    }
                    onChange={(e) =>
                      handleTimeChange(comment.no, e.target.value)
                    }
                    onBlur={() => handleTimeBlur(index, comment.no)}
                    maxLength={10}
                    spellCheck={false}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={comment.commands.join(" ")}
                    onChange={(ev) =>
                      handleEdit(index, "commands", ev.target.value)
                    }
                    title={comment.commands.join(" ")}
                    maxLength={124}
                    spellCheck={false}
                  />
                </td>
                <td>
                  <textarea
                    rows={1}
                    value={comment.body}
                    onChange={(ev) =>
                      handleEdit(index, "body", ev.target.value)
                    }
                    title={comment.body}
                    maxLength={1024}
                    spellCheck={false}
                  />
                </td>
                <td>{comment.no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styled.buttons}>
        <Button
          colorType="red"
          disabled={selectedRows.size === 0}
          onClick={handleDelete}
        >
          選択したコメントを削除
        </Button>
      </div>
    </>
  );
};
