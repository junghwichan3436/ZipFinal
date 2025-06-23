import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useCommentStore from "../stores/commentStore";

// 스타일 컴포넌트들 (답글 관련 제거)
const CommentInputContainer = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #1a1a1a 0%, #1f1f1f 100%);
  position: sticky;
  bottom: 0;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media screen and (min-width: 1025px) {
    border-radius: 0 0 16px 16px;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 24px;
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 14px;
`;

const UserInputAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a9eff 0%, #74b9ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(74, 158, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);

  @media screen and (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const CommentTextInput = styled.textarea`
  flex: 1;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 22px;
  padding: 14px 18px;
  color: #fff;
  font-size: 1.4rem;
  font-family: "Pretendard", sans-serif;
  outline: none;
  resize: none;
  min-height: 48px;
  max-height: 140px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &:focus {
    border-color: #4a9eff;
    background: rgba(74, 158, 255, 0.1);
    box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.2);
    transform: scale(1.02);
  }

  &::placeholder {
    color: #aaa;
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    padding: 12px 16px;
    min-height: 44px;
  }
`;

const SubmitButton = styled.button`
  width: 48px;
  height: 48px;
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
    transform: ${(props) =>
      props.$hasText ? "scale(1.1) rotate(5deg)" : "none"};
  }

  &:active {
    transform: ${(props) => (props.$hasText ? "scale(0.95)" : "none")};
  }

  @media screen and (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

const CommentInput = () => {
  const [newComment, setNewComment] = useState("");
  const textareaRef = useRef(null);

  const { addComment } = useCommentStore();

  // 댓글 입력 핸들러
  const handleInputChange = useCallback((e) => {
    setNewComment(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140
      )}px`;
    }
  }, []);

  // 댓글 전송
  const handleSubmitComment = useCallback(() => {
    if (!newComment.trim()) return;

    addComment(newComment);
    setNewComment("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  }, [newComment, addComment]);

  // 키보드 이벤트
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmitComment();
      }
    },
    [handleSubmitComment]
  );

  return (
    <CommentInputContainer>
      {/* 일반 댓글 입력창만 유지 */}
      <InputContainer>
        <UserInputAvatar>나</UserInputAvatar>
        <InputWrapper>
          <CommentTextInput
            ref={textareaRef}
            value={newComment}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="댓글을 입력해 주세요..."
            rows={1}
          />
          <SubmitButton
            $hasText={newComment.trim().length > 0}
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            aria-label="댓글 전송"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </SubmitButton>
        </InputWrapper>
      </InputContainer>
    </CommentInputContainer>
  );
};

export default CommentInput;
