import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import useCommentStore from "../stores/commentStore"; // 경로 수정!
import {
  ReplyContainer,
  CommentUserInfo,
  UserAvatar,
  UserInfo,
  UserName,
  CommentTime,
  CommentText,
  CommentActions,
  ActionButton,
} from "./commentStyle";

const ReplyItem = React.memo(({ reply }) => {
  const { toggleCommentReaction, getCommentReaction } = useCommentStore();
  const reaction = getCommentReaction(reply.id);

  const handleLike = () => {
    toggleCommentReaction(reply.id, "liked");
  };

  const handleDislike = () => {
    toggleCommentReaction(reply.id, "disliked");
  };

  return (
    <ReplyContainer>
      <CommentUserInfo style={{ marginBottom: "8px" }}>
        <UserAvatar
          $color={reply.color}
          style={{ width: "32px", height: "32px", fontSize: "1.1rem" }}
        >
          {reply.username.charAt(0)}
        </UserAvatar>
        <UserInfo>
          <UserName style={{ fontSize: "1.3rem" }}>{reply.username}</UserName>
          <CommentTime style={{ fontSize: "1.1rem" }}>{reply.time}</CommentTime>
        </UserInfo>
      </CommentUserInfo>

      <CommentText
        style={{
          fontSize: "1.3rem",
          marginLeft: "48px",
          marginBottom: "8px",
        }}
      >
        {reply.text}
      </CommentText>

      <CommentActions style={{ marginLeft: "48px", gap: "12px" }}>
        <ActionButton
          $active={reaction.liked}
          onClick={handleLike}
          style={{ padding: "6px 10px", fontSize: "1.1rem" }}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{reply.likes + (reaction.liked ? 1 : 0)}</span>
        </ActionButton>

        <ActionButton
          $active={reaction.disliked}
          onClick={handleDislike}
          style={{ padding: "6px 10px", fontSize: "1.1rem" }}
        >
          <FontAwesomeIcon icon={faThumbsDown} />
          <span>{reply.dislikes + (reaction.disliked ? 1 : 0)}</span>
        </ActionButton>
      </CommentActions>
    </ReplyContainer>
  );
});

ReplyItem.displayName = "ReplyItem";

export default ReplyItem;
