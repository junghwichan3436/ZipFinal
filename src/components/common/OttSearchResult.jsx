import styled from "styled-components";
import { useAllDataViews, playlistIds, StarData } from "../../StarData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import YouTube from "react-youtube";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .videoWrapper {
    display: flex;
    width: 100%;
  }
`;

const Artist = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ArtistWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArtistBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  .swiper-slide {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none; /* 안 보일 때 클릭 안 되게 */
    background: var(--light-color);
    border-radius: 50%;
    color: var(--dark-color);
    width: 40px;
    height: 40px;
    &::after {
      font-size: 3rem;
    }
  }
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
      pointer-events: auto;
    }
  }
  .swiper-button-prev::after {
    content: "<";
  }
  .swiper-button-next::after {
    content: ">";
  }
  @media screen and (max-width: 767px) {
    padding: 10% 3%;
    .swiper-button-prev,
    .swiper-button-next {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none; /* 안 보일 때 클릭 안 되게 */
      background: var(--light-color);
      border-radius: 50%;
      color: var(--dark-color);
      width: 32px;
      height: 32px;
      &::after {
        font-size: 2rem;
      }
    }
  }
`;

const SlideTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: bold;
  font-family: "EHNormalTrial";
  z-index: 1;

  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
  }
`;

const VideoCon = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    display: block;
    transition: all 0.3s;
  }
  iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  &.active {
    img {
      opacity: -1;
    }
  }
`;

const VideoText = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  div {
    &:nth-child(1) {
      flex: 1;
      cursor: pointer;
    }
    &:nth-child(2) {
      flex: 9;
      display: flex;
      flex-direction: column;
      gap: 10px;
      p {
        &:first-child {
          font-size: 1.4rem;
          line-height: 1.8rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:nth-child(2) {
          font-size: 1.2rem;
          color: var(--subTitle);
          text-transform: uppercase;
        }
      }
    }
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media screen and (max-width: 767px) {
    &:nth-child(2) {
      p {
        font-size: 1.4rem;
        &:nth-child(2) {
          font-size: 1.2rem !important;
        }
      }
    }
  }
`;

const FilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  gap: 20px;
  div {
    position: relative;
    width: 100%;
    img {
      width: 100%;
      max-height: 230px;
      object-fit: cover;
      position: relative;
      filter: brightness(70%);
      transition: all 0.3s;
    }
    p {
      position: absolute;
      left: 3%;
      bottom: 3%;
      text-transform: uppercase;
      font-family: "EHNormalTrial";
      transition: all 0.3s;
    }
    &:hover {
      img {
        filter: brightness(100%);
      }
      p {
        color: var(--dark-color);
      }
    }
  }
`;

const OttSearchResult = () => {
  const { isLoading, data } = useAllDataViews(playlistIds);
  const { isLoading: loading02, data: data02 } = StarData();
  const VideoRef = useRef(null);
  const navigate = useNavigate();
  const topRatedData = data?.slice(0, 12);
  const artist = data02?.artists?.filter((artist) =>
    topRatedData?.find((item) => item.title.includes(artist.artistName))
  );
  const handleReady = (event) => {
    // event.target은 YT.Player 인스턴스
    VideoRef.current = event.target;
  };

  const VideoPlay = (e) => {
    if (VideoRef.current) {
      e.target.style.opacity = 0;
      VideoRef.current.stopVideo();
      VideoRef.current.playVideo();
    }
  };

  const VideoStop = (e) => {
    if (VideoRef.current) {
      e.target.style.opacity = 1;
      VideoRef.current.stopVideo();
    }
  };
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      mute: 1,
      loop: 1,
      controls: 0, // 컨트롤 바 숨기기
      modestbranding: 1, // 유튜브 로고 최소화
      rel: 0, // 관련 영상 숨기기
      fs: 0, // 전체화면 버튼 숨기기
      disablekb: 1, // 키보드 제어 비활성화
      autoplay: 1, // 자동재생
      enablejsapi: 1, // JS API 활성화
    },
  };
  return (
    <Container>
      <Artist>
        <SlideTitle>POPULAR STAR</SlideTitle>
        <ArtistWrap>
          {artist?.map((artist) => (
            <ArtistBox>
              <div>
                <img src={artist.artistImg} alt={artist.artistName} />
              </div>
              <p>{artist.artistName}</p>
            </ArtistBox>
          ))}
        </ArtistWrap>
      </Artist>
      <Category>
        <SlideTitle>POPULAR VIDEO</SlideTitle>
        <Swiper
          className="videoWrapper"
          modules={[Navigation]}
          navigation={true}
          breakpoints={{
            1920: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 2, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
              spaceBetween: 20,
            },
          }}
        >
          {topRatedData?.map((video) => {
            const working = data02?.artists?.find((artist) =>
              video.title.includes(artist.artistName)
            );
            return working ? (
              <>
                <SwiperSlide key={video.position}>
                  <VideoCon
                    onMouseEnter={VideoPlay}
                    onMouseLeave={VideoStop}
                    onClick={() =>
                      navigate(`/ott/detail/${encodeURIComponent(video.title)}`)
                    }
                  >
                    <img src={video.thumbnails.high.url} alt="" />
                    <YouTube
                      videoId={video.resourceId.videoId}
                      opts={opts}
                      onReady={handleReady}
                    />
                  </VideoCon>
                  <VideoText>
                    <div
                      onClick={() => navigate(`/star/${working.artistName}`)}
                    >
                      <img src={working?.artistImg} alt="" />
                    </div>
                    <div>
                      <p>{video.title}</p>
                      <p>{video.videoOwnerChannelTitle}</p>
                    </div>
                  </VideoText>
                </SwiperSlide>
              </>
            ) : (
              <div></div>
            );
          })}
        </Swiper>
      </Category>
      <FilterWrap>
        <SlideTitle>BROWSE ALL</SlideTitle>
        <Filter>
          <div>
            <div>
              <img
                src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/cf88bc1e-e18e-436f-06ee-89ba28dabd00/w=1024,h=1024,fit=crop"
                alt=""
              />
              <p>Bag</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/f08e38ff-57f2-4b57-c671-5c778c8f1200/w=1024,h=1345"
                alt=""
              />
              <p>Style</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/f08e38ff-57f2-4b57-c671-5c778c8f1200/w=1024,h=1345"
                alt=""
              />
              <p>Talk</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/f08e38ff-57f2-4b57-c671-5c778c8f1200/w=1024,h=1345"
                alt=""
              />
              <p>Shorts</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/f08e38ff-57f2-4b57-c671-5c778c8f1200/w=1024,h=1345"
                alt=""
              />
            </div>
            <p>Star</p>
          </div>
          <div>
            <div>
              <img
                src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/f08e38ff-57f2-4b57-c671-5c778c8f1200/w=1024,h=1345"
                alt=""
              />
              <p>Orginal</p>
            </div>
          </div>
        </Filter>
      </FilterWrap>
    </Container>
  );
};

export default OttSearchResult;
