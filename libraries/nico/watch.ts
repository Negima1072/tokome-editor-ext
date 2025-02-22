import { HEADERS } from "./const";

export const getWatchData = async (watchId: string): Promise<WatchData> => {
  const response = await fetch(
    `https://www.nicovideo.jp/watch/${watchId}?responseType=json`,
    {
      headers: HEADERS,
      credentials: "include",
    }
  );
  const data: WatchAPIResponse = await response.json();
  return data.data.response;
};
