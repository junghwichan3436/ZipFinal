import styled from "styled-components";
import { AiOutlineLike } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StarData, bagData, interviewData, allData } from "../../StarData";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";

const Container = styled.div`
  width: 100%;
  padding: 0 3%;
  overflow-x: hidden;
  color: var(--light-color);
  background: var(--dark-color);
`;

const Line = styled.div`
  width: 100%;
  margin: 34px 0;
  border: 1px solid var(--border-color);
  left: 10px;
  right: 10px;
`;

const MainContent = styled.div`
  display: flex;
  padding: 5% 0 0 0;
  gap: 70px;
  width: 100%;

  @media (max-width: 1400px) {
    flex-direction: column; /* 순서 바뀜 */
    padding: 100px 30px 0 30px;
    gap: 60px;
  }

  @media (max-width: 1024px) {
    padding: 80px 30px 0 30px;
    gap: 50px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px 0 20px;
    gap: 40px;
  }

  @media (max-width: 480px) {
    padding: 40px 15px 0 15px;
    gap: 30px;
  }
`;

const RightContent = styled.div`
  width: 100%;
  height: 100%;
  /* aspect-ratio: 1 ; */
`;

const VideoContent = styled.div`
  width: 100%;
  height: 575px;
  /* border: 1px solid var(--light-color); */

  @media (max-width: 1024px) {
    height: 450px;
  }

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const LeftContent = styled.div`
  width: 70%;
  height: 100%;
  border-top: 1px solid var(--light-color);
  @media (max-width: 1400px) {
    width: 100%;
  }
`;

const LeftTop = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;

  @media (max-width: 1400px) {
    width: 100%;
    order: 1;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const LeftMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 70px 0 0 0;

  div:nth-child(1) {
    font-size: 3.5rem;
    font-weight: 700;
    @media (max-width: 1400px) {
      order: 3;
    }

    @media (max-width: 1024px) {
      font-size: 3.2rem;
    }

    @media (max-width: 768px) {
      font-size: 2.4rem;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  div:nth-child(3) {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 12px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }
`;

const DescriptionText = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  &.expanded {
    overflow: visible;
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const DescriptionButton = styled.div`
  display: contents;
  background: var(--dark-color);
  cursor: pointer;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  padding: 10px 0 0 0;
  /* gap: 10px; */

  @media (max-width: 768px) {
    padding: 15px 0 0 30px;
  }

  @media (max-width: 480px) {
    padding: 10px 0 0 20px;
  }
`;

const Like = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid var(--light-color);
  transition: all 0.3s;
  cursor: pointer;

  &.like-default {
    background: var(--dark-color);
    color: var(--light-color);
  }

  &.like-default:hover {
    background: #fff;
    color: #000;
  }

  &.like-selected {
    background: var(--light-color);
    color: var(--dark-color);
  }

  &.like-selected:hover {
    background: #fff;
    color: #000;
  }
`;

const Insta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid var(--light-color);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: #000;
    background: #fff;
  }
`;

const Share = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid var(--light-color);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: #000;
    background: #fff;
  }
`;

const VideoContents = styled.div`
  /* padding: 0 0 0 40px; */
  /* aspect-ratio: 16 / 9; */
  @media (max-width: 1400px) {
    order: 2;
  }
`;

const ContentVideo = styled.div`
  width: 400px;
  height: 225px;
  margin: 20px 0 10px 0;
`;

const Toptitle = styled.div`
  font-size: 5rem;
`;
const Profile = styled.div`
  display: flex;
  gap: 15px;
  cursor: pointer;
`;

const ProfileImg = styled.div`
  width: 44px;
  height: 44px;
  aspect-ratio: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  :nth-child(1) {
    font-size: 1.4rem;
    line-height: 1.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :nth-child(2) {
    font-size: 1.2rem;
    color: var(--subTitle);
    text-transform: uppercase;
  }
`;

const RelateProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 80px 0;
  margin-bottom: 80px;
  @media screen and (max-width: 1024px) {
    margin-top: 80px;
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
        cursor: pointer;
      }
      .swiper-slide:last-child {
        div {
          border-right: none;
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
const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  padding-right: 20px;
`;
const FilterItemImgWrap = styled.div`
  width: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;
const FilterItemImg = styled.img`
  display: block;
  padding: 30px;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background: var(--light-color);
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
const FilterItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  padding: 10px 10px;
  min-height: 120px;
`;

const FilterItemName = styled.p`
  font-size: 1.8rem;
  line-height: 2.4rem;
  margin: 10px 0 4px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
  }
`;
const FilterItemBrand = styled.li`
  color: var(--subTitle);
  font-size: 1.4rem;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;
const FilterItemPrice = styled.div`
  display: inline;
  font-size: 1.8rem;
  color: var(--border-color);
  /* border: 1px solid var(--border-color); */
  &:hover {
    color: var(--border-color);
  }
`;

const StyledYouTubeWrapper = styled.span`
  position: absolute;
  /* display: none; */
  width: 100%;
  height: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 (9 / 16 = 0.5625) */
  /* height: 0; */
  /* overflow: hidden; */
  margin: 40px 0 25px 0;
  /* opacity: 0%; */
  /* z-index: 100; */
  iframe {
    /* position: absolute; */
    width: 100%;
    height: 100%;
    border: none;
    &:hover {
      /* display: block; */
    }
  }
`;

const Thumbnails = styled.span`
  position: relative;
  width: 100%;
  height: 100%;
  /* padding-bottom: 56.25%; */
  margin: 40px 0 25px 0;
  /* z-index: 1000; */
  /* opacity: 0%; */
  cursor: pointer;
  img {
    width: 100%;
    &:hover {
      /* display: none; */
    }
  }
`;

const OttDetail = () => {
  // 마우스 오버했을때 동영상 재생
  // const playerRef = useRef(null);

  // const onPlayerReady = (event) => {
  //   playerRef.current = event.target;
  // };

  // const handleMouseEnter = () => {
  //   if (playerRef.current) {
  //     playerRef.current.playVideo();
  //   }
  // };

  // const handleMouseLeave = () => {
  //   if (playerRef.current) {
  //     playerRef.current.pauseVideo();
  //   }
  // };

  const toggleExpanded = () => {
    //description useref사용
    if (descriptionRef.current) {
      const el = descriptionRef.current;
      el.classList.toggle("expanded");
    }
    if (buttonRef.current) {
      buttonRef.current.textContent =
        buttonRef.current.textContent === "더보기" ? "접기" : "더보기";
    }
  };
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const { title } = useParams();
  const navigate = useNavigate();
  const likeRef = useRef(null); //좋아요
  const isSelected = useRef(false); // 상태 저장용

  const handleLikeClick = () => {
    isSelected.current = !isSelected.current; //현재 선택되었는지 안되어있는지 확인

    if (likeRef.current) {
      //만약 선택이 되었다면
      likeRef.current.classList.toggle("like-selected", isSelected.current); //선택된값 클래스 주기
      likeRef.current.classList.toggle("like-default", !isSelected.current); //디폴트값 클래스 주기
    }
  };

  const YouTubeEmbed = ({ videoId }) => (
    <iframe
      style={{ pointerEvents: "true" }} //포인트가 이동했을때 누를 수 있을지 없을지 boolean값으로 확인
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${find02Data?.contentDetails?.videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;  block;"
      allowFullScreen
    />
  );

  const { data } = StarData(); //스타 상품 데이터
  // console.log(data);
  const { data: data02 } = bagData(); //인마이백데이터
  // console.log(data02);
  const { data: data03 } = interviewData(); //인터뷰데이터
  // console.log(data03);
  const { data: YoutubeDatas } = allData(); //모든 데이터

  const findData = data?.artists?.find(
    (
      artist //영상 title과 맞는 artistName이 있는 것을 출력하기
    ) => title.includes(artist.artistName)
  );
  console.log(findData);

  const find02Data = YoutubeDatas?.find(
    (
      YoutubeData //title 과 맞는 youtube정보값 찾아오기
    ) => YoutubeData.snippet.title?.includes(title)
  );

  console.log(find02Data);

  const regex = new RegExp(findData?.artistName); //정규표현식 사용해서 아티스트네임 찾아오기

  const matchedDataLists = YoutubeDatas?.filter((YoutubeData) =>
    regex.test(YoutubeData.snippet.title)
  );

  // const thumb = matchedDataLists?.find((matchedDataList) => {
  //   matchedDataList..includes(title)
  // })

  // console.log(matchedDataLists[0]?.snippet?.title); //아티스트의 인마백,인터뷰,본업영상 찾아오기

  return (
    <Container>
      <MainContent>
        <LeftContent>
          <LeftTop>
            <div>{findData?.artistName} Zip.</div>
            {/* charAt함수는 몇번째 알파벳을 찾아올 수있다
              slice함수 인자값으로 숫자 하나만 넣어준다면 그 숫자 부터 찾아온다 */}
            <div>
              {find02Data?.contentDetails?.videoPublishedAt.split("T")[0]}
            </div>
            {/* split함수는 T를 기준으로 2개를 나누어 0과 1로 둘중에 무었을 사용할 것 인지를 결정해주면 된다 */}
          </LeftTop>
          <LeftMain>
            <div>{find02Data?.snippet?.title}</div>
            <DescriptionText ref={descriptionRef}>
              {find02Data?.snippet?.description}
            </DescriptionText>
            <DescriptionButton ref={buttonRef} onClick={toggleExpanded}>
              더보기
            </DescriptionButton>
            <div>{find02Data?.snippet?.videoOwnerChannelTitle}</div>
          </LeftMain>
          <Buttons>
            <Like
              ref={likeRef}
              className="like-default"
              onClick={handleLikeClick}
            >
              <AiOutlineLike size={30} />
            </Like>
            <Insta
              onClick={() =>
                window.open(
                  "https://www.instagram.com/accounts/login/?next=%2Flogin%2F&source=desktop_nav"
                )
              }
            >
              <FaInstagram size={30} />
            </Insta>
            <Share
              onClick={() => {
                navigator.clipboard.writeText(window.location.href); // 현재 페이지 주소 복사
                alert("복사되었습니다!"); // 알림창 띄우기
              }}
            >
              <PiShareFat size={30} />
            </Share>
          </Buttons>
        </LeftContent>
        <RightContent>
          <VideoContent>
            <YouTubeEmbed videoId={find02Data?.contentDetails?.videoId} />
          </VideoContent>
        </RightContent>
      </MainContent>
      <Line />
      <RelateProducts>
        <RelateProductsTitle>{findData?.artistName} Pick</RelateProductsTitle>
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
          {findData?.products.map((product) => (
            <SwiperSlide
              onClick={() =>
                navigate(`/detail/${encodeURIComponent(product.itemName)}`)
              }
            >
              {/* /detail/만 넣어줌으로써 localhost가 서로 이어붙지 않도록 해주었다
                      encodeURIComponent함수를 사용하면 20%를 자동으로 공백에 붙여준다*/}
              <FilterItem>
                <FilterItemImgWrap>
                  <FilterItemImg
                    src={product.detailImg.img01}
                    alt="제품 이미지"
                  />
                </FilterItemImgWrap>
                <FilterItemText>
                  <FilterItemBrand>{product.brand}</FilterItemBrand>
                  <FilterItemName key={product.productId}>
                    {product.itemName}
                  </FilterItemName>
                  <FilterItemPrice>구매하러가기</FilterItemPrice>
                </FilterItemText>
              </FilterItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </RelateProducts>
      <VideoContents>
        <Toptitle>Related Video</Toptitle>
        <Swiper
          breakpoints={{
            1920: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1500: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            540: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            0: {
              slidesPerView: 2, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
              spaceBetween: 40,
            },
          }}
        >
          {matchedDataLists?.map((matchedDataList) => (
            <SwiperSlide
              onClick={() =>
                navigate(
                  `/ott/detail/${encodeURIComponent(
                    matchedDataList.snippet.title
                  )}`
                )
              }
            >
              <Thumbnails>
                <img
                  src={matchedDataList?.snippet?.thumbnails?.standard?.url}
                  alt="썸네일"
                />
              </Thumbnails>
              <Profile>
                <ProfileImg>
                  <img src={findData.artistImg} alt="아티스트이미지" />
                </ProfileImg>
                <Title>
                  <div>{matchedDataList.snippet.title}</div>
                  <div>{matchedDataList.snippet.videoOwnerChannelTitle}</div>
                </Title>
              </Profile>
            </SwiperSlide>
          ))}
        </Swiper>
        <div></div>
      </VideoContents>
    </Container>
  );
};

export default OttDetail;
