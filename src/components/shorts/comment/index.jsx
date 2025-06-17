import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useCommentStore from "../stores/commentStore";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import {
  CommentOverlay,
  CommentContainer,
  CommentHeader,
  CloseButton,
  CommentList,
  EmptyState,
} from "./commentStyle";

const Comment = React.memo(
  ({ isOpen, onClose, video, commentCount = 0, videoData }) => {
    const { getAllComments, setApiComments, clearReplyingTo } =
      useCommentStore();

    const allComments = getAllComments();

    // API 데이터로 댓글 초기화
    useEffect(() => {
      if (videoData?.comments) {
        setApiComments(videoData.comments);
      }
    }, [videoData, setApiComments]);

    // 댓글창이 열릴 때 답글 상태 초기화
    useEffect(() => {
      if (isOpen) {
        clearReplyingTo();
      }
    }, [isOpen, clearReplyingTo]);

    // 댓글창이 닫혀있으면 렌더링하지 않음
    if (!isOpen) return null;

    return (
      <>
        <CommentOverlay $isOpen={isOpen} onClick={onClose} />
        <CommentContainer $isOpen={isOpen}>
          <CommentHeader>
            <h3>댓글 {allComments.length}</h3>
            <CloseButton onClick={onClose} aria-label="댓글창 닫기">
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
          </CommentHeader>

          <CommentList>
            {allComments.length > 0 ? (
              allComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            ) : (
              <EmptyState>
                <div className="icon">💬</div>
                <h4>첫 번째 댓글을 남겨보세요!</h4>
                <p>이 영상에 대한 생각을 공유해주세요</p>
              </EmptyState>
            )}
          </CommentList>

          <CommentInput />
        </CommentContainer>
      </>
    );
  }
);

Comment.displayName = "Comment";

export default Comment;
