import React, { useState, useRef, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faBars,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import useCommentStore from "../stores/commentStore";
import ReplyItem from "./ReplyItem";
import {
  CommentItemWrapper,
  CommentUserInfo,
  UserAvatar,
  UserInfo,
  UserName,
  CommentTime,
  CommentText,
  CommentActions,
  ActionButton,
  ReplyButton,
} from "./commentStyle";

// 답글 입력창 전용 스타일
const ReplyInputContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: rgba(74, 158, 255, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(74, 158, 255, 0.2);

  @media screen and (max-width: 768px) {
    margin-left: 48px;
    padding: 12px;
  }
`;

const ReplyInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const ReplyUserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a9eff 0%, #74b9ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(74, 158, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);

  @media screen and (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
`;

const ReplyInputTextarea = styled.textarea`
  flex: 1;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  padding: 12px 16px;
  color: #fff;
  font-size: 1.3rem;
  font-family: "Pretendard", sans-serif;
  outline: none;
  resize: none;
  min-height: 40px;
  max-height: 120px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &:focus {
    border-color: #4a9eff;
    background: rgba(74, 158, 255, 0.1);
    box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
    transform: scale(1.01);
  }

  &::placeholder {
    color: #aaa;
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    padding: 10px 14px;
    min-height: 36px;
  }
`;

const ReplyActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CancelButton = styled.button`
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  color: #aaa;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    transform: translateY(-1px);
  }

  @media screen and (max-width: 768px) {
    padding: 6px 12px;
    font-size: 1rem;
  }
`;

const ReplySubmitButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.$hasText
      ? "linear-gradient(135deg, #4a9eff 0%, #74b9ff 100%)"
      : "rgba(255, 255, 255, 0.1)"};
  color: #fff;
  cursor: ${(props) => (props.$hasText ? "pointer" : "not-allowed")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${(props) =>
    props.$hasText
      ? "0 4px 15px rgba(74, 158, 255, 0.4)"
      : "0 2px 8px rgba(0, 0, 0, 0.1)"};

  &:hover {
    background: ${(props) =>
      props.$hasText
        ? "linear-gradient(135deg, #357abd 0%, #5fa8ff 100%)"
        : "rgba(255, 255, 255, 0.1)"};
    transform: ${(props) => (props.$hasText ? "scale(1.1)" : "none")};
  }

  &:active {
    transform: ${(props) => (props.$hasText ? "scale(0.95)" : "none")};
  }

  @media screen and (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const CommentItem = React.memo(({ comment }) => {
  const [replyText, setReplyText] = useState("");
  const replyTextareaRef = useRef(null);

  const {
    toggleCommentReaction,
    getCommentReaction,
    replyingTo,
    setReplyingTo,
    clearReplyingTo,
    toggleReplies,
    expandedReplies,
    addReply,
  } = useCommentStore();

  const reaction = getCommentReaction(comment.id);
  const isExpanded = expandedReplies.has(comment.id);
  const isReplyingToThis = replyingTo === comment.id;

  // 답글 입력창에 포커스
  useEffect(() => {
    if (isReplyingToThis && replyTextareaRef.current) {
      setTimeout(() => {
        replyTextareaRef.current?.focus();
      }, 100);
    }
  }, [isReplyingToThis]);

  const handleLike = () => {
    toggleCommentReaction(comment.id, "liked");
  };

  const handleDislike = () => {
    toggleCommentReaction(comment.id, "disliked");
  };

  const handleReply = () => {
    console.log("답글 버튼 클릭:", comment.id);
    if (isReplyingToThis) {
      clearReplyingTo();
      setReplyText("");
    } else {
      setReplyingTo(comment.id);
      setReplyText("");
    }
  };

  const handleToggleReplies = () => {
    toggleReplies(comment.id);
  };

  // 답글 입력 핸들러
  const handleReplyInputChange = useCallback((e) => {
    setReplyText(e.target.value);

    if (replyTextareaRef.current) {
      replyTextareaRef.current.style.height = "auto";
      replyTextareaRef.current.style.height = `${Math.min(
        replyTextareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, []);

  // 답글 전송
  const handleSubmitReply = useCallback(() => {
    if (!replyText.trim() || !isReplyingToThis) return;

    console.log("답글 전송:", { replyingTo: comment.id, replyText });

    addReply(comment.id, replyText);
    setReplyText("");
    clearReplyingTo();

    if (replyTextareaRef.current) {
      replyTextareaRef.current.style.height = "auto";
    }
  }, [replyText, isReplyingToThis, addReply, comment.id, clearReplyingTo]);

  // 답글 취소
  const handleCancelReply = useCallback(() => {
    clearReplyingTo();
    setReplyText("");
    if (replyTextareaRef.current) {
      replyTextareaRef.current.style.height = "auto";
    }
  }, [clearReplyingTo]);

  // 키보드 이벤트
  const handleReplyKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmitReply();
      }
    },
    [handleSubmitReply]
  );

  return (
    <CommentItemWrapper>
      <CommentUserInfo>
        <UserAvatar $color={comment.color}>
          {comment.username.charAt(0)}
        </UserAvatar>
        <UserInfo>
          <UserName>{comment.username}</UserName>
          <CommentTime>{comment.time}</CommentTime>
        </UserInfo>
      </CommentUserInfo>

      <CommentText>{comment.text}</CommentText>

      <CommentActions>
        <ActionButton $active={reaction.liked} onClick={handleLike}>
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{comment.likes + (reaction.liked ? 1 : 0)}</span>
        </ActionButton>

        <ActionButton $active={reaction.disliked} onClick={handleDislike}>
          <FontAwesomeIcon icon={faThumbsDown} />
          <span>{comment.dislikes + (reaction.disliked ? 1 : 0)}</span>
        </ActionButton>

        <ReplyButton onClick={handleReply}>
          {isReplyingToThis ? "취소" : "답글"}
        </ReplyButton>

        {comment.replies && comment.replies.length > 0 && (
          <ActionButton onClick={handleToggleReplies}>
            <FontAwesomeIcon icon={faBars} />
            <span>
              {isExpanded ? "답글 숨기기" : `답글 ${comment.replies.length}개`}
            </span>
          </ActionButton>
        )}
      </CommentActions>

      {/* 답글 입력창 - 해당 댓글 바로 아래에 표시 */}
      {isReplyingToThis && (
        <ReplyInputContainer>
          <ReplyInputWrapper>
            <ReplyUserAvatar>나</ReplyUserAvatar>
            <ReplyInputTextarea
              ref={replyTextareaRef}
              value={replyText}
              onChange={handleReplyInputChange}
              onKeyPress={handleReplyKeyPress}
              placeholder={`${comment.username}님에게 답글...`}
              rows={1}
            />
            <ReplyActions>
              <CancelButton onClick={handleCancelReply}>취소</CancelButton>
              <ReplySubmitButton
                $hasText={replyText.trim().length > 0}
                onClick={handleSubmitReply}
                disabled={!replyText.trim()}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </ReplySubmitButton>
            </ReplyActions>
          </ReplyInputWrapper>
        </ReplyInputContainer>
      )}

      {/* 답글 목록 */}
      {comment.replies && comment.replies.length > 0 && isExpanded && (
        <div>
          {comment.replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </CommentItemWrapper>
  );
});

CommentItem.displayName = "CommentItem";

export default CommentItem;
