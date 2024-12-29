type ForkType = "main" | "easy" | "owner";

interface NvCommentAPIResponse {
  meta: {
    status: number;
    error_code: string | null;
  };
  data: CommentData | null;
}

interface CommentData {
  globalComments: {
    id: string;
    count: number;
  }[];
  threads: CommentThread[];
}

interface CommentThread {
  id: string;
  fork: string;
  commentCount: number;
  comments: Comment[];
}

interface MiniComment {
  vposMs: number;
  commands: string[];
  body: string;
  no: number;
}

interface OwnerComment extends MiniComment {
  id: string;
}

interface Comment extends OwnerComment {
  nicoruCount: number;
  nicoruId: string | null;
  postedAt: string;
  source: string;
  score: number;
  userId: string;
  isMyPost: boolean;
  isPremium: boolean;
}
