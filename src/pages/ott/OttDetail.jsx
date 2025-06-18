import styled from "styled-components";
import { AiOutlineLike } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StarData, bagData, interviewData, allData } from "../../StarData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef , useEffect,useState} from "react";


const Container = styled.div`
  color: var(--light-color);
  background: var(--dark-color);
`;

// const MainContent = styled.div`
//   display: flex;
//   padding: 110px 40px 0 40px;
//   gap: 70px;
//   /* border-bottom: 1px solid #f00; */
//   width: 100%;
//   /* height: 575px; */
// `;


// const LeftContent = styled.div`
//   /* width: 735px; */
//   width: 70%;
//   height: 100%;
//   border-top: 1px solid var(--light-color);
// `;

// const LeftTop = styled.div`
//   margin-top: 15px;
//   display: flex;
//   justify-content: space-between;
// `;

// const LeftMain = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 18px;
//   padding: 70px 45px 0 50px;
//   :nth-child(1) {
//     font-size: 4rem;
//     font-weight: 700;
//   }
//   :nth-child(3) {
//     font-size: 1.8rem;
//     font-weight: 500;
//     margin-bottom: 12px;

//   }
// `

// const DescriptionText = styled.div`
//   font-size: 1.5rem;
//   font-weight: 300;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-line-clamp: 3;
//   -webkit-box-orient: vertical;
//   &.expanded {
//     overflow: visible;
//     display: block;
//     -webkit-line-clamp: unset;
//     -webkit-box-orient: unset;
//   }
// `;

// const DescriptionButton = styled.div`
//     display: flex;
//     background: var(--dark-color);
//     cursor: pointer;
//     justify-content: flex-end;

// `

// const Buttons = styled.div`
// display: contents;
// display: flex;
// padding: 20px 0 0 50px;
// `


// const Like = styled.span`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 50px;
//   height: 50px;
//   border: 1px solid var(--light-color);
//   transition: all 0.3s;
//   cursor: pointer;

//   &.like-default {
//     background: var(--dark-color);
//     color: var(--light-color);
//   }

//   &.like-default:hover {
//     background: #fff;
//     color: #000;
//   }

//   &.like-selected {
//     background: var(--light-color);
//     color: var(--dark-color);
//   }

//   &.like-selected:hover {
//     background: #fff;
//     color: #000;
//   }
// `;

// const Insta = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// width: 50px;
// height: 50px;
// border: 1px solid var(--light-color);
// transition: all 0.3s;
// cursor: pointer;
// &:hover {
//   color: #000;
//   background: #fff;
// }
// `

// const Share = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// width: 50px;
// height: 50px;
// border: 1px solid var(--light-color);
// transition: all 0.3s;
//   cursor: pointer;
// &:hover {
//   color: #000;
//   background: #fff;
// }
// `

// const RightContent = styled.div`
//   width: 100%;
//   height: 100%;
//   /* border: 1px solid #000; */
// `;
// const VideoContent = styled.div`
//   width: 100%;
//   height: 575px;
//   border: 1px solid var(--light-color);
// `;


// const Line = styled.div`
//   /* width: 100%; */
//   margin: 34px 40px 0px 40px;
//   border: 1px solid var(--border-color);
//   /* left: 10px; */
//   /* right: 10px; */
//   /* margin: 0 40px; */
// `;
const Line = styled.div`
  width: 100%;
  margin: 34px 40px 0px 40px;
  border: 1px solid var(--border-color);
  left: 10px;
  right: 10px;
`;
const MainContent = styled.div`
  display: flex;
  padding: 110px 40px 0 40px;
  gap: 70px;
  width: 100%;

  @media (max-width: 1400px) {
    flex-direction: column-reverse; /* 순서 바뀜 */
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
`;

const VideoContent = styled.div`
  width: 100%;
  height: 575px;
  border: 1px solid var(--light-color);

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
  padding: 70px 45px 0 50px;

  div:nth-child(1) {
    font-size: 4rem;
    font-weight: 700;

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
  display: flex;
  background: var(--dark-color);
  cursor: pointer;
  justify-content: flex-end;
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
  padding: 20px 0 0 50px;
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
const Product = styled.div`
display: contents;
overflow: hidden;
`

const ProductImg = styled.div`
/* position: relative; */

width: 100%;
    overflow: hidden;
    margin: 30px 0px 20px 0;
    contain: content;
  img {
    /* position: absolute; */
    display: inline;
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
  const toggleExpanded = () => { //description useref사용
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

    if (likeRef.current) { //만약 선택이 되었다면
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
  const { data : data02 } = bagData(); //인마이백데이터
  // console.log(data02);
  const {  data : data03  } = interviewData(); //인터뷰데이터
  // console.log(data03);
  const {data: YoutubeDatas} = allData(); //모든 데이터
  
  const findData = data?.artists?.find((artist) => //영상 title과 맞는 artistName이 있는 것을 출력하기
    title.includes(artist.artistName)
);
// console.log(findData);


// const bagtitles = YoutubeDatas.map((YoutubeData) => YoutubeData);
// console.log(bagtitles); //bagData 하나씩만 찾아오기

// const find02Data = data02?.items?.find((item) =>
//   title.includes(title)
// );

const find02Data = YoutubeDatas?.find((YoutubeData) => //title 과 맞는 youtube정보값 찾아오기
YoutubeData.snippet.title?.includes(title)
);

console.log(YoutubeDatas);


// const find02Data = data02?.items.find((item) =>
//   item?.snippet?.titles?.includes(title)
// );

// console.log(data02.items[0].snippet.title);

  return (
    <Container>
      <MainContent>
        <LeftContent>
          <LeftTop>
            <div>{findData?.artistName} Zip.</div>
            {/* charAt함수는 몇번째 알파벳을 찾아올 수있다
            slice함수 인자값으로 숫자 하나만 넣어준다면 그 숫자 부터 찾아온다 */}
            <div>{find02Data?.contentDetails?.videoPublishedAt.split('T')[0]}</div>
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
            <div>By {find02Data?.snippet?.videoOwnerChannelTitle}</div>
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
      <Line/>
        <BeautyContents>
      <BeautyTitle>{findData?.artistName} Pick</BeautyTitle>
          <BeautyContent>
          <Swiper
          slidesPerView={5}
          >
                {findData?.products.map((product) => (
              <SwiperSlide>
                  <Product>
                    <ProductImg key={product.productId} ><img src={product.detailImg.img01} alt="제품 이미지" /></ProductImg>
                  <Name>
                    <DetailName key={product.productId}>
                      {product.itemName}
                      </DetailName>
                    <Payment onClick={() => navigate(`/detail/${encodeURIComponent(product.itemName)}`)}>구매하러가기</Payment> 
                    {/* /detail/만 넣어줌으로써 localhost가 서로 이어붙지 않도록 해주었다
                    encodeURIComponent함수를 사용하면 20%를 자동으로 공백에 붙여준다
                    */}
                    </Name>
                  </Product>
              </SwiperSlide>
                  ))}
            </Swiper>
          </BeautyContent>
        </BeautyContents>
        <VideoContents>
          <Toptitle>Related Video</Toptitle>
          <Swiper
                    spaceBetween={0}
                    slidesPerView={4}
                    >
            {/* {find02Data.} */}
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
