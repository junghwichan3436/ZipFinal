import styled, { keyframes } from "styled-components";

// 애니메이션 키프레임
export const smoothSlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
    filter: blur(4px);
  }
  50% {
    opacity: 0.8;
    transform: translateX(50%) scale(0.98);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: blur(0px);
  }
`;

export const smoothSlideOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: blur(0px);
  }
  50% {
    opacity: 0.6;
    transform: translateX(30%) scale(0.98);
    filter: blur(1px);
  }
  100% {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
    filter: blur(4px);
  }
`;

export const smoothSlideUpMobile = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%) scale(0.95);
    filter: blur(4px);
  }
  60% {
    opacity: 0.9;
    transform: translateY(20%) scale(0.98);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
`;

export const smoothSlideDownMobile = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
  40% {
    opacity: 0.7;
    transform: translateY(20%) scale(0.98);
    filter: blur(1px);
  }
  100% {
    opacity: 0;
    transform: translateY(100%) scale(0.95);
    filter: blur(4px);
  }
`;

export const gentleFadeIn = keyframes`
  0% {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  100% {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
`;

export const gentleFadeOut = keyframes`
  0% {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
  100% {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
`;

// 스타일 컴포넌트들
export const CommentOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: ${(props) => (props.$isOpen ? gentleFadeIn : gentleFadeOut)} 0.4s
    ease-out forwards;

  @media screen and (min-width: 1025px) {
    display: none;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const CommentContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #1f1f1f 100%);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);

  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;

  animation: ${(props) => (props.$isOpen ? smoothSlideIn : smoothSlideOut)} 0.5s
    cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  @media screen and (min-width: 1025px) {
    position: relative;
    width: 480px; /* 400px에서 480px로 증가 */
    height: auto;
    margin-top: 0;
    margin-left: 20px;
    min-height: 500px;
    max-height: calc(100vh - 100px);
    animation: none;
    transform: none;
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    background: linear-gradient(135deg, #1a1a1a 0%, #1f1f1f 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 380px;
    height: 75vh;
    top: 50%;
    right: 30px;
    animation: ${(props) => (props.$isOpen ? smoothSlideIn : smoothSlideOut)}
      0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    transform-origin: center right;
    border-radius: 16px;
    max-height: 600px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  @media screen and (max-width: 768px) {
    top: auto;
    bottom: 0;
    height: 65vh;
    width: 100%;
    border-radius: 24px 24px 0 0;
    animation: ${(props) =>
        props.$isOpen ? smoothSlideUpMobile : smoothSlideDownMobile}
      0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3);
  }
`;

export const CommentHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #1f1f1f 100%);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  h3 {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
    font-family: "Pretendard", sans-serif;
    background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media screen and (min-width: 1025px) {
    border-radius: 12px 12px 0 0;
    padding: 18px 20px;

    h3 {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 20px 24px;
    border-radius: 24px 24px 0 0;

    &::before {
      content: "";
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 5px;
      background: linear-gradient(90deg, #666 0%, #888 50%, #666 100%);
      border-radius: 3px;
      opacity: 0.8;
    }

    h3 {
      font-size: 1.6rem;
    }
  }
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }

  @media screen and (min-width: 1025px) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.4rem;
  }
`;

export const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  scroll-behavior: smooth;
  background: rgba(26, 26, 26, 0.95);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #666 0%, #888 100%);
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #777 0%, #999 100%);
  }

  scrollbar-width: thin;
  scrollbar-color: #666 rgba(255, 255, 255, 0.05);
`;

export const CommentItemWrapper = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    transform: translateX(4px);
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    background: linear-gradient(45deg, #4a9eff 0%, #74b9ff 100%);
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 3px;
  }

  @media screen and (min-width: 1025px) {
    padding: 16px 20px;
  }

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${(props) =>
    props.$color
      ? `linear-gradient(135deg, ${props.$color} 0%, ${props.$color}dd 100%)`
      : "linear-gradient(135deg, #666 0%, #888 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);

  @media screen and (min-width: 1025px) {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
  }
`;

export const CommentUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;

  @media screen and (min-width: 1025px) {
    gap: 12px;
    margin-bottom: 10px;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  color: #fff;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 2px;
  font-family: "Pretendard", sans-serif;

  @media screen and (min-width: 1025px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const CommentTime = styled.div`
  color: #aaa;
  font-size: 1.2rem;
  font-weight: 400;

  @media screen and (min-width: 1025px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const CommentText = styled.p`
  color: #e8e8e8;
  font-size: 1.4rem;
  line-height: 1.6;
  margin: 0 0 14px 0;
  word-break: break-word;
  font-weight: 400;

  @media screen and (min-width: 1025px) {
    font-size: 1.3rem;
    margin: 0 0 12px 0;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 56px;

  @media screen and (min-width: 1025px) {
    margin-left: 48px;
    gap: 12px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 52px;
    gap: 12px;
  }
`;

export const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: ${(props) => (props.$active ? "#4a9eff" : "#aaa")};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 8px 14px;
  border-radius: 20px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    color: #4a9eff;
    background: rgba(74, 158, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(74, 158, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media screen and (min-width: 1025px) {
    font-size: 1.1rem;
    gap: 6px;
    padding: 6px 10px;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
    gap: 6px;
    padding: 6px 12px;
  }
`;

export const ReplyButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 8px 14px;
  border-radius: 20px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    color: #4a9eff;
    background: rgba(74, 158, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(74, 158, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media screen and (min-width: 1025px) {
    font-size: 1.1rem;
    padding: 6px 10px;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
    padding: 6px 12px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  color: #888;
  text-align: center;
  padding: 0 40px;

  .icon {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.6;
    background: linear-gradient(135deg, #666 0%, #999 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h4 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 12px 0;
    font-family: "Pretendard", sans-serif;
    color: #ccc;
  }

  p {
    font-size: 1.4rem;
    margin: 0;
    font-weight: 400;
    line-height: 1.5;
    color: #999;
  }

  @media screen and (min-width: 1025px) {
    height: 200px;
    padding: 0 30px;

    .icon {
      font-size: 3.5rem;
      margin-bottom: 16px;
    }

    h4 {
      font-size: 1.6rem;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.3rem;
    }
  }
`;

export const ReplyContainer = styled.div`
  margin-left: 56px;
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid rgba(74, 158, 255, 0.3);
  background: rgba(74, 158, 255, 0.05);
  border-radius: 0 12px 12px 0;

  @media screen and (min-width: 1025px) {
    margin-left: 48px;
    padding-left: 12px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 48px;
    padding-left: 12px;
  }
`;
