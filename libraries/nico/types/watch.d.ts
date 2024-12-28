interface NvComment {
  threadKey: string;
  server: string;
  params: {
    targets: {
      id: string;
      fork: string;
    }[];
    language: string;
  };
}

interface WatchData {
  comment: {
    server: string;
    keys: {
      userKey: string;
    };
    layers: {
      index: number;
      isTranslucent: boolean;
      threadIds: {
        id: number;
        fork: number;
        forkLabel: string;
      }[];
    }[];
    threads: {
      id: number;
      fork: number;
      forkLabel: string;
      videoId: string;
      isActive: boolean;
      isDefaultPostTarget: boolean;
      isEasyCommentPostTarget: boolean;
      isLeafRequired: boolean;
      isOwnerThread: boolean;
      isThreadkeyRequired: boolean;
      threadkey: string | null;
      is184Forced: boolean;
      hasNicoscript: boolean;
      label: string;
      postkeyStatus: number;
      server: string;
    }[];
    ng: never;
    isAttentionRequired: boolean;
    nvComment: NvComment;
  };
  owner: {
    id: number;
    nickname: string;
    iconUrl: string;
    channel: never;
    live: never;
    isVideosPublic: boolean;
    isMylistsPublic: boolean;
    videoLiveNotice: never;
    viewer: {
      isFollowing: boolean;
    };
  };
  video: {
    id: string;
    title: string;
    description: string;
    count: {
      view: number;
      comment: number;
      mylist: number;
      like: number;
    };
    duration: number;
    thumbnail: {
      url: string;
      middleUrl: string | null;
      largeUrl: string | null;
      player: string;
      ogp: string;
    };
    rating: {
      isAdult: boolean;
    };
    registeredAt: string;
    isPrivate: boolean;
    isDeleted: boolean;
    isNoBanner: boolean;
    isAuthenticationRequired: boolean;
    isEmbedPlayerAllowed: boolean;
    isGiftAllowed: boolean;
    viewer: {
      isOwner: boolean;
      like: {
        isLiked: boolean;
        count: number | null;
      };
    };
    watchableUserTypeForPayment: string;
    commentableUserTypeForPayment: string;
  };
  viewer: {
    id: number;
    nickname: string;
    isPremium: boolean;
    allowSensitiveContents: boolean;
    existence: {
      age: number;
      prefecture: string;
      sex: string;
    };
  };
}

interface WatchAPIResponse {
  meta: {
    status: number;
    code: string;
  };
  data: {
    metadata: never;
    googleTagManager: never;
    response: WatchData;
  };
}
