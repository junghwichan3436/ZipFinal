import { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: -280px;
  @media screen and (max-width: 767px) {
    margin-bottom: -180px;
  }
  button {
    cursor: pointer;
  }
`;

const MainSlide = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  @media screen and (max-width: 767px) {
  }
`;

const SlideImg = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent),
      linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    img {
      width: auto;
      transform: translateX(-500px);
    }
    &::after {
      /* background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent); */
    }
  }
`;

const SlideInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 25%;
  left: 3%;
  width: 550px;
  gap: 20px;
  @media screen and (max-width: 1024px) {
    width: 400px;
  }
  @media screen and (max-width: 768px) {
    width: 400px;
    top: auto;
    bottom: 30%;
  }
`;

const SlideText = styled.div`
  color: var(--light-color);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s;
  p {
    font-weight: bold;
    font-size: 3rem;
    white-space: nowrap;
  }
  &.active {
    opacity: 1;
    transform: translateY(0);
  }
  @media screen and (max-width: 1024px) {
    p {
      font-size: 2.4rem;
    }
  }
`;

const SlideDesc = styled(SlideText)`
  transition-delay: 0.4s;
  line-height: 1.5;
  font-weight: 300;
  font-size: 1.4rem;
`;

const SlideBtn = styled(SlideText)`
  transition-delay: 0.8s;
  display: flex;
  gap: 10px;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: "EHNormalTrial";
  }
  @media screen and (max-width: 1024px) {
    button {
      padding: 8px 16px;
    }
  }
`;

const slides = [
  {
    id: 1,
    image:
      "https://64.media.tumblr.com/27d3f315997fcc04df3309307d1c9901/0dda17077632b77d-03/s540x810/9db198e10ad5b0c458b92a8162c90fd32f97f517.gif",
    title: "ZIP ORIGINAL | 로제의 APT에는 어떤 리얼템이?",
    desc: `로제는 이 도시 속 수많은 감정들 위에서 살아간다. 감정의 소용돌이 안에서 흘러가는 듯 보이지만, 실은 그 어느 때보다 단단하고 명확하다. APT 속의 그녀는 ‘지금 여기’에 존재하며, 누군가에게 보여지기 위한 사람이 아닌, 그저 ‘로제’로 살아가는 법을 배운다. 그녀는 감정을 말로 설명하기보단 공간에 스며들게 만든다. 조명이 따뜻한 이유, 브라운 톤의 옷을 고른 이유, 그 모든 선택은 그녀를 표현하는 방식이다. APT는 단순한 장소가 아니다. 이건 그녀가 가장 자신다운 순간을 마주하는 내밀한 공간이며, 그 안에서 우린 그녀의 진짜 모습을 엿볼 수 있다.`,
    buttons: [
      {
        label: "Play",
        to: "/ott/originalDetail/1",
      },
      { label: "About", to: "/star/로제" },
    ],
  },
  {
    id: 2,
    image:
      "https://file3.instiz.net/data/file3/2024/03/15/7/6/3/763525b6b38f691b9b603fd490d7fefb.gif",
    title: "INFP의 여왕 김지원의 인마이백 👑",
    desc: `인프피의 여왕에게 주7회 약속이란? ❤️‍🩹 배우 #김지원 이 불가리 퍼퓸과 함께 엘르 카메라 앞에 섰습니다. 침대와 음악만 있으면 어디든 갈 수 있는 만렙 집순이의 루틴부터 환상의 궁합을 자랑하는 MBTI, 지하철에서 나도 모르게 뒤돌아보게 되는 향까지! 이모지로 파헤친 여왕님의 모든 것을 지금 바로 확인해 보세요.`,
    buttons: [
      {
        label: "Play",
        to: "/ott/detail/INFP의%20여왕%20김지원%20👑%20일주일에%20약속%207개%20가능?💧|%20ELLE%20KOREA",
      },
      { label: "About", to: "/star/김지원" },
    ],
  },
  {
    id: 3,
    image:
      "https://file3.instiz.net/data/cached_img/upload/2023/09/03/23/26d986f93d73db17b1993a0b00419485.gif",
    title: "ZIP ORIGINAL | 늘 무거운 봉석이의 비밀 가방",
    desc: `김봉석은 알고 있었다. 자신이 다른 아이들과 다르다는 것을. 그러나 그 다름이 드러나는 순간, 평온한 일상은 깨질 수 있다는 것도. 그래서 그는 달렸다. 무대가 아닌 운동장에서. 선풍기가 돌아가는 교실에서 친구들과 어울리고, 도시락을 먹고, 숙제를 했다. 그리고 그 모든 평범한 일상이 얼마나 소중한지 그 누구보다 잘 알고 있었다. 그는 초능력을 숨기기 위해 더 인간적으로 살았다. 어쩌면 그건 강함이 아닌 약함에서 온 선택일지도 모른다. 그의 가방 속에는 슈퍼히어로의 흔적 대신, 아버지의 시계, 친구들과 나눈 문구, 낡은 운동화가 있다.`,
    buttons: [
      {
        label: "Play",
        to: "/ott/originalDetail/2",
      },
      { label: "About", to: "/star/이정하" },
    ],
  },
  {
    id: 4,
    image:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMThfNjUg%2FMDAxNzMxODYyNjM4MDU0.0fjJZRgxTAypGax5HqSyrhNiH-0_mMx72xFNrRbsr7Ig.rfDC28EonoJPDKfqMS173r5qka8h7Q_F3q5d6ObSluUg.GIF%2FIMG_3106.GIF&type=sc960_832_gif",
    title: "ZIP ORIGINAL | 당하지 않는 비비의 책가방",
    desc: `세상은 그녀를 무시했고, 사랑은 그녀를 찢었다. 처음엔 당했다. 하지만 끝에는 웃었다. 빨간 립스틱처럼 선명하게, 핏빛 복수처럼 강렬하게. 비비가 뮤직비디오 '데레'에서 보여준 인물은 단순한 희생자가 아니다. 사랑을 복수로 승화시키며 스스로 주체가 된 여자. 미쳐버릴 듯한 감정도, 휘청이는 정체성도 모두 껴안고 자기만의 방식으로 끝장을 낸 여자. 그녀의 가방 속엔, 상처를 무기로 바꾼 사람만이 가질 수 있는 것들이 있다.`,
    buttons: [
      {
        label: "Play",
        to: "/ott/originalDetail/4",
      },
      { label: "About", to: "/star/비비" },
    ],
  },
];

const OttBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  return (
    <Container>
      <Swiper
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          1920: { slidesPerView: 1, spaceBetween: 0 },
          0: { slidesPerView: 1, spaceBetween: 0 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <MainSlide>
              <SlideImg>
                <img src={slide.image} alt="" />
              </SlideImg>
              <SlideInfo>
                <SlideText className={activeIndex === index ? "active" : ""}>
                  <p>{slide.title}</p>
                </SlideText>
                <SlideDesc className={activeIndex === index ? "active" : ""}>
                  {slide.desc}
                </SlideDesc>
                <SlideBtn className={activeIndex === index ? "active" : ""}>
                  {slide.buttons.map((btn, i) => (
                    <button key={i} onClick={() => navigate(btn.to)}>
                      {btn.label}
                    </button>
                  ))}
                </SlideBtn>
              </SlideInfo>
            </MainSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default OttBanner;
