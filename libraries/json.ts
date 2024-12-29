import { str2time, time2str } from "./vpos";

interface JsonComment {
  time: string;
  command: string;
  comment: string;
}

export const isSafeJson = (json: string): boolean => {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return false;
    if (
      !parsed.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          typeof item.time === "string" &&
          typeof item.command === "string" &&
          typeof item.comment === "string"
      )
    ) {
      return false;
    }
    return parsed.every(
      (item: JsonComment) =>
        item.comment.length > 0 &&
        item.comment.length <= 1024 &&
        item.command.length <= 124 &&
        str2time(item.time) !== undefined
    );
  } catch (e) {
    return false;
  }
};

export const json2comments = (json: string): MiniComment[] => {
  const parsed: JsonComment[] = JSON.parse(json);
  return parsed.map<MiniComment>((comment, index) => {
    return {
      body: comment.comment,
      commands: comment.command.split(" "),
      no: index + 1,
      vposMs: (str2time(comment.time) || 0) * 1000,
    };
  });
};

export const comments2json = (comments: MiniComment[]): string => {
  return JSON.stringify(
    comments
      .sort((a, b) => a.no - b.no)
      .map<JsonComment>((comment) => {
        return {
          time: time2str(comment.vposMs / 1000),
          command: comment.commands.join(" "),
          comment: comment.body,
        };
      }),
    null,
    2
  );
};
