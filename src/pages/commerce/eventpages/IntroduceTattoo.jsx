import React, { useRef } from "react";
import EventBanner from "../../../components/event/EventBanner";
import ScrollButton from "../../../components/event/ScrollButton";
import Introduce from "../../../components/event/Introduce";
import Quiz from "../../../components/event/Quiz";
import WhatInBag from "../../../components/event/WhatInBag";

const IntroduceTattoo = () => {
  const bundleRefs = [useRef(null), useRef(null), useRef(null)];
  return (
    <>
      <EventBanner />
      <ScrollButton />
      <Introduce bundleRefs={bundleRefs} />
      <Quiz />
      <WhatInBag bundleRefs={bundleRefs} />
    </>
  );
};

export default IntroduceTattoo;
