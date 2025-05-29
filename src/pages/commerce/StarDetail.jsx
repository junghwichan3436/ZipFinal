import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { StarData } from "../../StarData";
import YouTube from "react-youtube";

const Container = styled.div`
  color: var(--light-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding-top: 80px;
  background: #000;
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;
    gap: 100px;
    row-gap: 100px;
  }
  .my-masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
    &:nth-child(even) {
      margin-top: 100px;
    }
  }
  /* Style your items */
  .my-masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 100px;
    width: 100%;
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
  @media screen and (max-width: 768px) {
    .my-masonry-grid {
      gap: 30px;
      margin-left: 0;
    }
    .my-masonry-grid_column {
      padding-left: 0px; /* gutter size */
      background-clip: padding-box;
      &:nth-child(even) {
        margin-top: 100px;
      }
    }
    /* Style your items */
    .my-masonry-grid_column > div {
      /* change div to reference your elements you put in <Masonry> */
      margin-bottom: 50px;
    }
  }
`;

const ArtistTitle = styled.h4`
  font-size: 6rem;
  font-family: "EHNormalTrial";
  @media screen and (max-width: 1024px) {
    font-size: 4rem;
  }
`;

const ArtistBg = styled.div`
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
    /* filter: brightness(50%); */
    &.active {
      filter: brightness(100%);
    }
  }
`;

const ArtistText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  p {
    font-size: 4rem;
    font-family: "EHNormalTrial";
    @media screen and (max-width: 1024px) {
      font-size: 3rem;
    }
  }
  h5 {
    font-size: 3rem;

    @media screen and (max-width: 1024px) {
      font-size: 2rem;
    }
  }
  &.active {
    opacity: 0;
    visibility: hidden;
  }
`;

const RelateProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 80px 3% 160px;
  width: 100%;
  color: #000;
  background: #fff;
  @media screen and (max-width: 1024px) {
    padding-top: 120px;
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
const StarDetail = () => {
  const navigate = useNavigate();

  const { starName } = useParams();
  const { isLoading, data } = StarData();
  const [textHide, setTextHide] = useState(false);
  const filterData =
    data?.artists?.filter((artist) => artist.artistName === starName) || [];
  const filterProducts = filterData[0]?.products;
  const iframeClick = () => {
    setTextHide(true);
  };

  useEffect(() => {
    if (!data) return;
    const artistName = data?.artists?.map((artist) => artist.artistName);
    console.log(artistName);
    const findName = artistName?.find((name) => name === starName);
    console.log(findName);
    if (!findName) {
      navigate("/404");
    }
  }, [data, starName, navigate]);

  const playerRef = useRef(null);

  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.mute(); // 자동 재생을 위해 음소거
    playerRef.current.playVideo();
  };

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
      <ArtistBg>
        <YouTube
          videoId={filterData[0]?.videoURL}
          opts={opts}
          onReady={onReady}
        />
        <ArtistText
          className={textHide ? "active" : ""}
          onClick={() => {
            iframeClick();
          }}
        >
          <p>{filterData[0]?.jobCategory.toUpperCase()}</p>
          <ArtistTitle>IN MY PLACE</ArtistTitle>
          <h5>{starName}</h5>
        </ArtistText>
      </ArtistBg>
      <RelateProducts>
        <RelateProductsTitle>{starName} PICK</RelateProductsTitle>
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
    </Container>
  );
};

export default StarDetail;
