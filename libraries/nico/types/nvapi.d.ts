interface NvAPIResponse<T = unknown> {
  meta: {
    status: number;
    error_code: string | null;
  };
  data: T | null;
}

interface ThreadKey {
  threadKey: string;
}

interface PostKey {
  postKey: string;
}

interface UpdateKey {
  updateKey: string;
}
