import { create } from "zustand";

const useCommentStore = create((set, get) => ({
  // 상태
  comments: [],
  userComments: [],
  commentLikes: {},
  replyingTo: null,
  expandedReplies: new Set(),

  // 유틸리티 함수들
  getRandomColor: () => {
    const colors = [
      "#ff6b7a",
      "#4834d4",
      "#00d2d3",
      "#ff9ff3",
      "#54a0ff",
      "#5f27cd",
      "#ff7675",
      "#fd79a8",
      "#fdcb6e",
      "#6c5ce7",
      "#a29bfe",
      "#fd79a8",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  },

  getRandomTime: () => {
    const timeOptions = [
      "방금 전",
      "1분 전",
      "5분 전",
      "30분 전",
      "1시간 전",
      "2시간 전",
      "1일 전",
      "2일 전",
      "3일 전",
      "1주 전",
    ];
    return timeOptions[Math.floor(Math.random() * timeOptions.length)];
  },

  // 액션들
  setComments: (comments) => set({ comments }),

  setApiComments: (apiComments) => {
    const { getRandomColor, getRandomTime } = get();
    const formattedComments = apiComments.map((comment, index) => ({
      id: `api-${index}`,
      username: comment.username || `사용자${index + 1}`,
      text: comment.comment || comment.text,
      time: getRandomTime(),
      likes: Math.floor(Math.random() * 20) + 5,
      dislikes: Math.floor(Math.random() * 3),
      replies: [],
      color: getRandomColor(),
      userAvatar: comment.userAvatar,
    }));
    set({ comments: formattedComments });
  },

  addComment: (text) => {
    const newComment = {
      id: `user-${Date.now()}`,
      username: "나",
      text: text.trim(),
      time: "방금 전",
      likes: 0,
      dislikes: 0,
      replies: [],
      color: "#4a9eff",
    };

    set((state) => ({
      userComments: [...state.userComments, newComment],
    }));
  },

  addReply: (parentId, text) => {
    const newReply = {
      id: `reply-${Date.now()}`,
      username: "나",
      text: text.trim(),
      time: "방금 전",
      likes: 0,
      dislikes: 0,
      color: "#4a9eff",
      isReply: true,
      parentId,
    };

    set((state) => {
      // 사용자 댓글에서 찾기
      const userCommentIndex = state.userComments.findIndex(
        (c) => c.id === parentId
      );
      if (userCommentIndex !== -1) {
        const updatedUserComments = [...state.userComments];
        updatedUserComments[userCommentIndex] = {
          ...updatedUserComments[userCommentIndex],
          replies: [newReply, ...updatedUserComments[userCommentIndex].replies],
        };
        return { userComments: updatedUserComments };
      }

      // API 댓글에서 찾기
      const apiComment = state.comments.find((c) => c.id === parentId);
      if (apiComment) {
        const updatedApiComment = {
          ...apiComment,
          replies: [newReply, ...apiComment.replies],
        };
        return {
          userComments: [
            updatedApiComment,
            ...state.userComments.filter((c) => c.id !== parentId),
          ],
        };
      }

      return state;
    });
  },

  toggleCommentReaction: (commentId, type) => {
    set((state) => ({
      commentLikes: {
        ...state.commentLikes,
        [commentId]: {
          ...state.commentLikes[commentId],
          [type]: !state.commentLikes[commentId]?.[type],
          [type === "liked" ? "disliked" : "liked"]: false,
        },
      },
    }));
  },

  setReplyingTo: (commentId) => set({ replyingTo: commentId }),

  clearReplyingTo: () => set({ replyingTo: null }),

  toggleReplies: (commentId) => {
    set((state) => {
      const newExpandedReplies = new Set(state.expandedReplies);
      if (newExpandedReplies.has(commentId)) {
        newExpandedReplies.delete(commentId);
      } else {
        newExpandedReplies.add(commentId);
      }
      return { expandedReplies: newExpandedReplies };
    });
  },

  // 계산된 값들 - 여기가 핵심 수정 부분!
  getAllComments: () => {
    const { userComments, comments } = get();
    // 순서 변경: 기존(API) 댓글들 먼저, 그 다음 사용자 댓글들
    return [...comments, ...userComments];
  },

  getCommentReaction: (commentId) => {
    const { commentLikes } = get();
    return commentLikes[commentId] || {};
  },
}));

export default useCommentStore;
