import { swfetch } from "../fetch";
import { HEADERS } from "./const";

export const getThreadKey = async (
  watchId: string
): Promise<string | undefined> => {
  const response = await fetch(
    `https://nvapi.nicovideo.jp/v1/comment/keys/thread?videoId=${watchId}`,
    {
      headers: HEADERS,
    }
  );
  const data: NvAPIResponse<ThreadKey> = await response.json();
  return data.data?.threadKey;
};

export const getPostKey = async (
  threadId: string
): Promise<string | undefined> => {
  const response = await fetch(
    `https://nvapi.nicovideo.jp/v1/comment/keys/post?threadId=${threadId}`,
    {
      headers: HEADERS,
    }
  );
  const data: NvAPIResponse<PostKey> = await response.json();
  return data.data?.postKey;
};

export const getUpdateKey = async (
  threadId: string
): Promise<string | undefined> => {
  const response = await swfetch(
    `https://nvapi.nicovideo.jp/v1/comment/keys/update?threadId=${threadId}`,
    {
      headers: HEADERS,
    }
  );
  const data: NvAPIResponse<UpdateKey> = await response.json();
  return data.data?.updateKey;
};

export const getComments = async (
  watchData: WatchData,
  forks: ForkType[] = ["main", "easy", "owner"],
  threadKey: string | null = null
): Promise<CommentData | null> => {
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
  const data: NvCommentAPIResponse = await response.json();
  if (data.meta.error_code === "EXPIRED_TOKEN") {
    const newThreadKey = await getThreadKey(watchData.video.id);
    return await getComments(watchData, forks, newThreadKey);
  }
  return data.data;
};

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
    comments: comments
      .sort((a, b) => a.no - b.no)
      .map((comment, index) => {
        return {
          ...comment,
          id: index.toString(),
          no: index + 1,
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
  return data.meta.status === 200;
};
