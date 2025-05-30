import styled from "styled-components";
import YouTube from "react-youtube";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--ott-bg-color);
  color: var(--light-color);
`;
const MainSlide = styled.div`
  top: 0;
  width: 100%;
  position: relative;
  cursor: pointer;
  z-index: 1;
  padding-top: 56.25%;
  iframe {
    width: 100%;
    object-fit: cover;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    scroll-behavior: none;
    z-index: -1;
  }
`;
const Ott = () => {
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      controls: 0, // 플레이어 컨트롤 숨김
      modestbranding: 1, // 채널 정보/제목 안 뜨게
      rel: 0, // 관련 영상 막기
      fs: 0, // 전체화면 버튼 제거
    },
  };
  return (
    <Container>
      <MainSlide>
        <YouTube videoId="V9PVRfjEBTI" opts={opts} />
      </MainSlide>
    </Container>
  );
};

export default Ott;
