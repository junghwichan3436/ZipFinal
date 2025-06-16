import styled from "styled-components";
import { AiOutlineLike } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StarData, bagData, interviewData } from "../../StarData";
// import Swiper core and required modules

import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from "react";

const Container = styled.div`
  color: var(--light-color);
  background: var(--dark-color);
`;

const MainContent = styled.div`
  display: flex;
  padding: 110px 40px 0 40px;
  gap: 70px;
  /* border-bottom: 1px solid #f00; */
  width: 100%;
  /* height: 575px; */
`;

const ItemContent = styled.div``;

const LeftContent = styled.div`
  /* width: 735px; */
  width: 70%;
  height: 100%;
  border-top: 1px solid var(--light-color);
`;

const LeftTop = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const LeftMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 70px 45px 0 50px;
  :nth-child(1) {
    font-size: 4rem;
    font-weight: 700;
  }
  :nth-child(2) {
    font-size: 1.5rem;
    font-weight: 300;
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  }
  :nth-child(3) {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 12px;

  }
`
const Buttons = styled.div`
display: flex;
padding-left: 50px;
cursor: pointer;
`


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
&:hover {
  color: #000;
  background: #fff;
}
`

const Share = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 50px;
height: 50px;
border: 1px solid var(--light-color);
transition: all 0.3s;
&:hover {
  color: #000;
  background: #fff;
}
`

const RightContent = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid #000; */
`;
const VideoContent = styled.div`
  width: 100%;
  height: 575px;
  border: 1px solid var(--light-color);
`;

const Line = styled.div`
  /* width: 100%; */
  margin: 34px 40px 0px 40px;
  border: 1px solid var(--border-color);
  /* left: 10px; */
  /* right: 10px; */
  /* margin: 0 40px; */
`;

const BeautyTitle = styled.div`
font-size: 5rem;
font-weight: 500;
`

const BeautyContents = styled.div`
  padding: 90px 0 120px 40px;
`;

const BeautyContent = styled.div`
  ul {
    display: flex;
    gap: 90px;
  }
  .RelateItemWrap {
    width: 100%;
    /* gap: 300px; */
  }
`;
const ProductImg = styled.div`
width: 100%;
    overflow: hidden;
    margin: 30px 0px 20px 0;
    contain: content;
  img {
    display: block;
    width: 300px;
    height: 300px;
  cursor: pointer;
  &:hover {
    scale: 1.1;
    transition: all 0.3s;
  }
  }
`;

const Name = styled.div``;

const DetailName = styled.div`
  font-size: 3rem;
  font-weight: 500;
  padding-bottom: 10px;
`;

const Payment = styled.div`
  display: inline-block;
  border-bottom: 1px solid var(--border-color);
  font-size: 2rem;
  color: var(--border-color);
  cursor: pointer;
`;

const VideoContents = styled.div`
  padding: 0 0 0 40px;
`;

const ContentVideo = styled.div`
  width: 400px;
  height: 225px;
  margin: 20px 0 10px 0 ; 
  /* border: 1px solid #f00; */
`;

const Toptitle = styled.div`
font-size: 5rem;
`
const Profile = styled.div`
  display: flex;
  gap: 15px;
`;

const ProfileImg = styled.div`
  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  :nth-child(1) {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

const OttDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const likeRef = useRef(null);
  const isSelected = useRef(false); // 상태 저장용

  const handleLikeClick = () => {
    isSelected.current = !isSelected.current;

    if (likeRef.current) {
      likeRef.current.classList.toggle("like-selected", isSelected.current);
      likeRef.current.classList.toggle("like-default", !isSelected.current);
    }
  };

  const YouTubeEmbed = ({ videoId }) => (
    <iframe
    style={{ pointerEvents: "true" }}
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${find02Data.resourceId.videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;  block;"
      allowFullScreen
    />
  );



  const { data } = StarData();
  // console.log(data);
  const { data : data02 } = bagData();
  // console.log(data02);
  const {  data : data03  } = interviewData();
  // console.log(data03);
  const findData = data?.artists?.find((artist) =>
    title.includes(artist.artistName)
);
console.log(data);
const bagtitles = data02?.items.map((item) => item.snippet);
console.log(bagtitles); //bagData 제목만 찾아오기

// const find02Data = data02?.items?.find((item) =>
//   title.includes(title)
// );

const find02Data = bagtitles?.find((bagtitle) => 
  bagtitle.title?.includes(title)
);
console.log(find02Data.title);


// const find02Data = data02?.items.find((item) =>
//   item?.snippet?.titles?.includes(title)
// );

// console.log(data02.items[0].snippet.title);

  return (
    <Container>
      <MainContent>
        <LeftContent>
          <LeftTop>
            <div>Bag Zip.</div>
            <div>2025.04.25</div>
          </LeftTop>
          <LeftMain>
            <div>{find02Data.title}</div>
            <div>
              {find02Data.description}
            </div>
            <div>By {find02Data.videoOwnerChannelTitle}</div>
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
            <YouTubeEmbed videoId={"3BmehC0J-p4"} />
          </VideoContent>
        </RightContent>
      </MainContent>
      <Line/>
        <BeautyContents>
      <BeautyTitle>{findData?.artistName} Pick</BeautyTitle>
          <BeautyContent>
          <Swiper>
              <SwiperSlide>
                <ProductImg><img src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg" alt="화장품" /></ProductImg>
                <Name>
                {findData?.products.map((product) => (
                  <DetailName key={product.productId}>
                    {product.itemName}
                    </DetailName>
                  ))}
                  
                  <Payment onClick={() => navigate(`/detail/나니머스에이에이%20그레이%20볼캡`)}>구매하러가기</Payment>
                  </Name>
              </SwiperSlide>
              <SwiperSlide>
                <ProductImg><img src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg" alt="화장품" /></ProductImg>
                <Name>
                  <DetailName>{findData?.products[0].itemName}</DetailName>
                  <Payment onClick={() => navigate(`/detail/나니머스에이에이%20그레이%20볼캡`)}>구매하러가기</Payment>
                  </Name>
              </SwiperSlide>
              <SwiperSlide>
                <ProductImg><img src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg" alt="화장품" /></ProductImg>
                <Name>
                  <DetailName>제품명</DetailName>
                  <Payment onClick={() => navigate(`/detail/나니머스에이에이%20그레이%20볼캡`)}>구매하러가기</Payment>
                  </Name>
              </SwiperSlide>
              <SwiperSlide>
                <ProductImg><img src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg" alt="화장품" /></ProductImg>
                <Name>
                  <DetailName>제품명</DetailName>
                  <Payment onClick={() => navigate(`/detail/나니머스에이에이%20그레이%20볼캡`)}>구매하러가기</Payment>
                  </Name>
              </SwiperSlide>
              <SwiperSlide>
                <ProductImg><img src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg" alt="화장품" /></ProductImg>
                <Name>
                  <DetailName>제품명</DetailName>
                  <Payment onClick={() => navigate(`/detail/나니머스에이에이%20그레이%20볼캡`)}>구매하러가기</Payment>
                  </Name>
              </SwiperSlide>
              <SwiperSlide>
                <ProductImg><img src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg" alt="화장품" /></ProductImg>
                <Name>
                  <DetailName>제품명</DetailName>
                  <Payment onClick={() => navigate(`/detail/나니머스에이에이%20그레이%20볼캡`)}>구매하러가기</Payment>
                  </Name>
              </SwiperSlide>
            </Swiper>
          </BeautyContent>
        </BeautyContents>
        <VideoContents>
          <Toptitle>Related Video</Toptitle>
          <Swiper
                    spaceBetween={0}
                    slidesPerView={4}
                    >
            <SwiperSlide>
              <ContentVideo>
              <YouTubeEmbed videoId={"3BmehC0J-p4"} />
            </ContentVideo>
            <Profile>
              <ProfileImg>
                <img
                  src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg"
                  alt="프로필"
                />
              </ProfileImg>
              <Title>
                <div>에스파 닝닝의 애장템은?</div>
                <div>W코리아</div>
              </Title>
            </Profile>
          </SwiperSlide>
          <SwiperSlide>
            <ContentVideo>
              <YouTubeEmbed videoId={"3BmehC0J-p4"} />
            </ContentVideo>
            <Profile>
              <ProfileImg>
                <img
                  src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg"
                  alt="프로필"
                />
              </ProfileImg>
              <Title>
                <div>에스파 닝닝의 애장템은?</div>
                <div>W코리아</div>
              </Title>
            </Profile>
          </SwiperSlide>
          <SwiperSlide>
            <ContentVideo>
              <YouTubeEmbed videoId={"3BmehC0J-p4"} />
            </ContentVideo>
            <Profile>
              <ProfileImg>
                <img
                  src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg"
                  alt="프로필"
                />
              </ProfileImg>
              <Title>
                <div>에스파 닝닝의 애장템은?</div>
                <div>W코리아</div>
              </Title>
            </Profile>
          </SwiperSlide>
          <SwiperSlide>
            <ContentVideo>
              <YouTubeEmbed videoId={"3BmehC0J-p4"} />
            </ContentVideo>
            <Profile>
              <ProfileImg>
                <img
                  src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg"
                  alt="프로필"
                />
              </ProfileImg>
              <Title>
                <div>에스파 닝닝의 애장템은?</div>
                <div>W코리아</div>
              </Title>
            </Profile>
          </SwiperSlide>
          <SwiperSlide>
            <ContentVideo>
              <YouTubeEmbed videoId={"3BmehC0J-p4"} />
            </ContentVideo>
            <Profile>
              <ProfileImg>
                <img
                  src="https://ecimg.cafe24img.com/pg788b56482897014/hanmicos/web/product/medium/20240126/73850e617d2f44fa1162a14b6a3cdc93.jpg"
                  alt="프로필"
                />
              </ProfileImg>
              <Title>
                <div>에스파 닝닝의 애장템은?</div>
                <div>W코리아</div>
              </Title>
            </Profile>
          </SwiperSlide>
        </Swiper>
        <div></div>
      </VideoContents>
    </Container>
  );
};

export default OttDetail;
