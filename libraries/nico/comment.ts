import { v4 as uuid } from "uuid";
import { swfetch } from "../fetch";
import { HEADERS } from "./const";
import type { WatchData } from "./watch";

type ForkType = "main" | "easy" | "owner";

export const getThreadKey = async (watchId: string): Promise<string> => {
  const response = await fetch(
    `https://nvapi.nicovideo.jp/v1/comment/keys/thread?videoId=${watchId}`,
    {
      headers: HEADERS,
    }
  );
  const data = await response.json();
  return data.data.threadKey;
};

export const getPostKey = async (threadId: string): Promise<string> => {
  const response = await fetch(
    `https://nvapi.nicovideo.jp/v1/comment/keys/post?threadId=${threadId}`,
    {
      headers: HEADERS,
    }
  );
  const data = await response.json();
  return data.data.postKey;
};

export const getUpdateKey = async (threadId: string): Promise<string> => {
  const response = await swfetch(
    `https://nvapi.nicovideo.jp/v1/comment/keys/update?threadId=${threadId}`,
    {
      headers: HEADERS,
    }
  );
  const data = await response.json();
  return data.data.updateKey;
};

export const getComments = async (
  watchData: WatchData,
  forks: ForkType[] = ["main", "easy", "owner"],
  threadKey: string | null = null
) => {
  const payload = {
    threadKey: threadKey || watchData.comment.nvComment.threadKey,
    params: watchData.comment.nvComment.params,
    additionals: {},
  };
  payload.params.targets = payload.params.targets.filter((target) => {
    return forks.includes(target.fork as ForkType);
  });
  const response = await fetch(
    `${watchData.comment.nvComment.server}/v1/threads`,
    {
      method: "POST",
      headers: {
        ...HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const data = await response.json();
  return data.data;
};

interface MiniComment {
  vposMs: number;
  commands: string[];
  body: string;
}

interface OwnerComment extends MiniComment {
  id: string;
  no: number;
  userId: string;
  isMyPost: boolean;
  isPremium: boolean;
}

export const updateOwnerComment = async (
  watchData: WatchData,
  updateKey: string,
  comments: MiniComment[]
) => {
  const threadId = watchData.comment.nvComment.params.targets.filter(
    (target) => {
      return target.fork === "owner";
    }
  )[0].id;
  const payload: {
    updateKey: string;
    videoId: string;
    comments: OwnerComment[];
  } = {
    updateKey,
    videoId: watchData.video.id,
    comments: comments.map((comment, index) => {
      return {
        ...comment,
        id: uuid(),
        no: index + 1,
        userId: watchData.viewer.id.toString(),
        isMyPost: true,
        isPremium: watchData.viewer.isPremium,
      };
    }),
  };
  const response = await swfetch(
    `${watchData.comment.nvComment.server}/v1/threads/${threadId}/owner-comments`,
    {
      method: "PUT",
      headers: {
        ...HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const data = await response.json();
  return data.data;
};