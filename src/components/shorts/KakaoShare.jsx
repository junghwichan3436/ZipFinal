import React, { useCallback, useMemo, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCopy,
  faCommentDots,
  faShare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

// 🎨 애니메이션 키프레임
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 📱 스타일 컴포넌트들
const ShareModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  animation: ${fadeIn} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media screen and (max-width: 768px) {
    align-items: flex-end;
    padding: 0;
  }
`;

const ShareContent = styled.div`
  background: #1a1a1a;
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  position: relative;
  border: 1px solid #333;
  animation: ${slideUp} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media screen and (max-width: 768px) {
    border-radius: 20px 20px 0 0;
    width: 100%;
    max-width: none;
    padding: 25px 20px 35px;
  }
`;

const ShareHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h3 {
    color: #fff;
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    font-family: "Pretendard", sans-serif;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const VideoPreview = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  margin-bottom: 25px;

  @media screen and (max-width: 768px) {
    gap: 12px;
    padding: 15px;
  }
`;

const VideoThumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  background: #333;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const VideoDetails = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    margin: 0 0 8px 0;
    font-size: 1.6rem;
    color: #fff;
    line-height: 1.3;
    font-weight: 600;
    font-family: "Pretendard", sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    @media screen and (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  p {
    margin: 0;
    font-size: 1.4rem;
    color: #888;
    line-height: 1.4;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const ShareOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    gap: 12px;
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 15px 20px;
  border: none;
  border-radius: 15px;
  background: ${(props) => props.$bgColor || "#333"};
  color: ${(props) => props.$textColor || "#fff"};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 1.4rem;
  font-family: "Pretendard", sans-serif;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    padding: 18px 20px;
    font-size: 1.5rem;
  }
`;

const UrlCopyContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  input {
    flex: 1;
    border: none;
    background: none;
    padding: 8px 12px;
    font-size: 1.4rem;
    color: #fff;
    font-family: "Pretendard", sans-serif;

    &:focus {
      outline: none;
    }

    &::selection {
      background: rgba(74, 158, 255, 0.3);
    }

    @media screen and (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 500;
    font-family: "Pretendard", sans-serif;
    transition: all 0.2s ease;

    &:hover {
      background: #0056b3;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    @media screen and (max-width: 768px) {
      font-size: 1.3rem;
      padding: 12px 18px;
    }
  }
`;

// 🚀 메인 컴포넌트
const KakaoShare = React.memo(({ isOpen, onClose, video }) => {
  // 📱 메모이제이션된 비디오 정보
  const videoInfo = useMemo(() => {
    if (!video) return null;

    return {
      title: video.title || "ZIP. SHORTS",
      thumbnail: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
      description: video.keyword?.join(" ") || "",
      shareUrl: `${window.location.origin}/shorts/${video.id}`,
    };
  }, [video]);

  // 🔧 카카오 SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.cleanup();
      window.Kakao.init("788c9afcb57d04021e2f0c6df11eb2b1");
    }
  }, []);

  // 🔗 공유 핸들러들
  const shareToKakao = useCallback(() => {
    if (!videoInfo) return;

    if (window.Kakao && window.Kakao.isInitialized()) {
      try {
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: videoInfo.title,
            description: videoInfo.description,
            imageUrl: videoInfo.thumbnail,
            link: {
              mobileWebUrl: videoInfo.shareUrl,
              webUrl: videoInfo.shareUrl,
            },
          },
          buttons: [
            {
              title: "ZIP. SHORTS에서 보기",
              link: {
                mobileWebUrl: window.location.origin,
                webUrl: window.location.origin,
              },
            },
          ],
        });
        setTimeout(onClose, 500);
      } catch (error) {
        console.error("카카오톡 공유 실패:", error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  }, [videoInfo, onClose]);

  const shareToTwitter = useCallback(() => {
    if (!videoInfo) return;

    const text = `${videoInfo.title} - ${videoInfo.description}`;
    const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(videoInfo.shareUrl)}`;

    window.open(twitterUrl, "_blank");
    setTimeout(onClose, 300);
  }, [videoInfo, onClose]);

  const shareToFacebook = useCallback(() => {
    if (!videoInfo) return;

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      videoInfo.shareUrl
    )}`;

    window.open(facebookUrl, "_blank");
    setTimeout(onClose, 300);
  }, [videoInfo, onClose]);

  const copyToClipboard = useCallback(async () => {
    if (!videoInfo) return;

    try {
      await navigator.clipboard.writeText(videoInfo.shareUrl);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      // 구형 브라우저 대응
      const textArea = document.createElement("textarea");
      textArea.value = videoInfo.shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("링크가 복사되었습니다!");
    }
    setTimeout(onClose, 300);
  }, [videoInfo, onClose]);

  const handleNativeShare = useCallback(() => {
    if (!videoInfo || !navigator.share) {
      copyToClipboard();
      return;
    }

    try {
      navigator.share({
        title: videoInfo.title,
        text: videoInfo.description,
        url: videoInfo.shareUrl,
      });
      setTimeout(onClose, 300);
    } catch (error) {
      copyToClipboard();
    }
  }, [videoInfo, onClose, copyToClipboard]);

  // ⌨️ ESC 키 핸들러
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // 🖱️ 오버레이 클릭 핸들러
  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // 📱 렌더링 조건
  if (!isOpen || !video || !videoInfo) return null;

  return (
    <ShareModal onClick={handleBackdropClick}>
      <ShareContent onClick={(e) => e.stopPropagation()}>
        <ShareHeader>
          <h3>공유하기</h3>
          <CloseButton onClick={onClose} aria-label="닫기">
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ShareHeader>

        {/* 📹 비디오 미리보기 */}
        <VideoPreview>
          <VideoThumbnail>
            <img src={videoInfo.thumbnail} alt={videoInfo.title} />
          </VideoThumbnail>
          <VideoDetails>
            <h4>{videoInfo.title}</h4>
            <p>{videoInfo.description}</p>
          </VideoDetails>
        </VideoPreview>

        {/* 📤 공유 옵션들 */}
        <ShareOptions>
          <ShareButton
            $bgColor="#FEE500"
            $textColor="#000"
            onClick={shareToKakao}
          >
            <FontAwesomeIcon icon={faCommentDots} />
            카카오톡
          </ShareButton>

          <ShareButton
            $bgColor="#000000"
            $textColor="#fff"
            onClick={shareToTwitter}
          >
            <FontAwesomeIcon icon={faXmark} />X (트위터)
          </ShareButton>

          <ShareButton
            $bgColor="#1877F2"
            $textColor="#fff"
            onClick={shareToFacebook}
          >
            <FontAwesomeIcon icon={faFacebook} />
            페이스북
          </ShareButton>

          <ShareButton
            $bgColor="#28a745"
            $textColor="#fff"
            onClick={navigator.share ? handleNativeShare : copyToClipboard}
          >
            <FontAwesomeIcon icon={navigator.share ? faShare : faCopy} />
            {navigator.share ? "공유하기" : "링크 복사"}
          </ShareButton>
        </ShareOptions>

        {/* 🔗 URL 복사 */}
        <UrlCopyContainer>
          <input type="text" value={videoInfo.shareUrl} readOnly />
          <button onClick={copyToClipboard}>복사</button>
        </UrlCopyContainer>
      </ShareContent>
    </ShareModal>
  );
});

KakaoShare.displayName = "KakaoShare";

export default KakaoShare;
