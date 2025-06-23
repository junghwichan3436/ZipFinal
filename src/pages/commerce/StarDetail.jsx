import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { StarData, useAllDataViews, playlistIds } from "../../StarData";
import YouTube from "react-youtube";

const Container = styled.div`
  color: var(--light-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: var(--ott-bg-color);

  .videoWrapper {
    display: flex;
    width: 100%;
  }
`;

const ArtistBg = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  height: 60vh;
  p {
    position: absolute;
    top: 50%;
    left: 3%;
    transform: translateY(-50%);
    font-size: 4rem;
  }
`;

const RelateProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 5% 3%;
  width: 100%;
  @media screen and (max-width: 1024px) {
    padding: 20% 3%;
  }
  .RelateItemWrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .RelateItem {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
  .swiper {
    .swiper-wrapper {
      .swiper-slide {
        display: flex;
        flex-direction: column;
        border-right: 1px solid var(--border-color);
        padding-right: 20px;
        cursor: pointer;
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
`;

const RelateProductsTitle = styled.h3`
  font-size: 3.2rem;
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
  }
`;

const RelateItemImgWrap = styled.div`
  width: 100%;
`;

const RelateItemImg = styled.img`
  width: 100%;
  object-fit: cover;
  padding: 30px;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background: var(--light-color);
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const RelateItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 10px 10px;
  min-height: 120px;
`;

const RelateItemBrand = styled.span`
  color: var(--subTitle);
  font-size: 1.4rem;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const RelateItemName = styled.p`
  font-size: 1.8rem;
  line-height: 2.4rem;
  margin: 10px 0;
  font-weight: 600;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
  }
`;

const RelateItemPrice = styled.span`
  letter-spacing: 0.2px;
  color: var(--subTitle);
  font-size: 1.4rem;
  color: var(--subTitle);
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const UserLike = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  padding: 5% 3%;
  .swiper-slide {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  @media screen and (max-width: 767px) {
    padding: 20% 3%;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    p {
      &:nth-child(2) {
        font-size: 1.4rem;
        color: var(--subTitle);
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

const StarDetail = () => {
  const navigate = useNavigate();
  const VideoRef = useRef(null);
  const { starName } = useParams();
  const { isLoading, data } = StarData();
  const { isLoading: loading02, data: data02 } = useAllDataViews(playlistIds);
  const artistVideo = data02?.filter((item) => item.title.includes(starName));
  console.log(artistVideo);
  const filterData = data?.artists?.find(
    (artist) => artist.artistName === starName
  );
  const filterProducts = filterData?.products;

  useEffect(() => {
    if (!data) return;
    const artistName = data?.artists?.map((artist) => artist.artistName);
    const findName = artistName?.find((name) => name === starName);
    if (!findName) {
      navigate("/404");
    }
  }, [data, starName, navigate]);

  const handleReady = (event) => {
    // event.target은 YT.Player 인스턴스
    VideoRef.current = event.target;
  };

  return (
    <Container>
      <ArtistBg
        style={{
          background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent), url(${
            filterData?.artistBanner
              ? filterData.artistBanner
              : filterData.artistImg
          }) center/cover no-repeat`,
        }}
      >
        <p>{starName}</p>
      </ArtistBg>
      {isLoading ? (
        <></>
      ) : (
        <>
          <UserLike>
            <SlideTitle>{starName} PLAYLIST</SlideTitle>
            <Swiper
              className="videoWrapper"
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
              {artistVideo?.map((video) => (
                <SwiperSlide key={video.title}>
                  <VideoCon>
                    <img src={video.thumbnails.high.url} alt="" />
                  </VideoCon>
                  <VideoText>
                    <div>
                      <p>{video.title}</p>
                      <p>{video.videoOwnerChannelTitle}</p>
                    </div>
                  </VideoText>
                </SwiperSlide>
              ))}
            </Swiper>
          </UserLike>
          <RelateProducts>
            <SlideTitle>{starName} PICK</SlideTitle>
            <Swiper
              className="RelateItemWrap"
              breakpoints={{
                1920: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                540: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                0: {
                  slidesPerView: 2, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
                  spaceBetween: 20,
                },
              }}
            >
              {filterProducts?.map((product, i) => (
                <SwiperSlide
                  key={i}
                  className="RelateItem"
                  onClick={() => navigate(`/detail/${product.itemName}`)}
                >
                  <RelateItemImgWrap>
                    <RelateItemImg src={product.detailImg.img01} alt="img02" />
                  </RelateItemImgWrap>
                  <RelateItemText onClick={() => `/detail/${product.itemName}`}>
                    <RelateItemBrand>{product.brand}</RelateItemBrand>
                    <RelateItemName>{product.itemName}</RelateItemName>
                    <RelateItemPrice>
                      KRW {product.price.toLocaleString()}
                    </RelateItemPrice>
                  </RelateItemText>
                </SwiperSlide>
              ))}
            </Swiper>
          </RelateProducts>
        </>
      )}
    </Container>
  );
};

export default StarDetail;
