import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormTop from "../../components/payment/FormTop";
import FormBottom from "../../components/payment/FormBottom";
import Order from "../../components/payment/Order";
import CouponModal from "../../components/payment/CouponModal";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { ORDER_ITEMS_KEY } from "../../constants/queryKeys";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3%;
`;

const PageTitle = styled.h1`
  font-size: 3.6rem;
  text-align: center;
  margin: 40px 0;
  font-weight: bold;
  margin-top: 60px;
  font-family: "EHNormalTrial", sans-serif;

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
    margin: 30px 0;
    margin-top: 60px;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.8rem;
    margin: 20px 0;
    margin-top: 60px;
  }
`;

const PageContent = styled.div`
  display: flex;
  gap: 40px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;
  }

  @media screen and (max-width: 402px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FormSection = styled.div`
  flex: 6;

  @media screen and (max-width: 1024px) {
    flex: none;
    width: 100%;
  }
`;

const OrderSection = styled.div`
  flex: 4;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  height: fit-content;

  @media screen and (max-width: 1024px) {
    flex: none;
    width: 100%;
    position: relative;
    top: 0;
    display: none;
  }
`;

const MobileOrderSection = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: block;
    width: 100%;
    margin: 20px 0;
  }
`;

const queryClient = new QueryClient();

const Payment = () => {
  const [saveAddress, setSaveAddress] = useState(false);
  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("신규 입력");
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    refund: false,
  });
  const [quantities, setQuantities] = useState({
    1: 1,
    2: 1,
  });
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponDropdownOpen, setCouponDropdownOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("선택 없음");
  const [couponNumber, setCouponNumber] = useState("");

  // 할인 정보 상태 추가
  const [discount, setDiscount] = useState({
    applied: false,
    type: "",
    rate: 0,
    amount: 0,
  });

  const openCouponModal = () => {
    setIsCouponModalOpen(true);
  };

  const closeCouponModal = () => {
    setIsCouponModalOpen(false);
    setCouponDropdownOpen(false);
  };

  const toggleCouponDropdown = () => {
    setCouponDropdownOpen(!couponDropdownOpen);
  };

  const applyCoupon = () => {
    if (selectedCoupon.includes("10%")) {
      setDiscount({
        applied: true,
        type: "percentage",
        rate: 10,
        amount: 0,
      });
    } else if (selectedCoupon.includes("15%")) {
      setDiscount({
        applied: true,
        type: "percentage",
        rate: 15,
        amount: 0,
      });
    } else {
      setDiscount({
        applied: false,
        type: "",
        rate: 0,
        amount: 0,
      });
    }

    closeCouponModal();
  };

  const { data: orderItems = [] } = useQuery({
    queryKey: [ORDER_ITEMS_KEY],
    // 데이터가 없으면 빈 배열 사용
    initialData: [],
  });

  useEffect(() => {
    const initialQuantities = {};
    orderItems.forEach((item) => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [orderItems]);

  return (
    <>
      <Container>
        <PageTitle>Payment</PageTitle>
        <PageContent>
          <FormSection>
            <FormTop
              saveAddress={saveAddress}
              setSaveAddress={setSaveAddress}
              addressDropdownOpen={addressDropdownOpen}
              setAddressDropdownOpen={setAddressDropdownOpen}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              openCouponModal={openCouponModal}
              selectedCoupon={selectedCoupon}
              couponNumber={couponNumber}
            />

            <MobileOrderSection>
              <Order
                orderItems={orderItems}
                quantities={quantities}
                setQuantities={setQuantities}
                discount={discount}
                couponName={selectedCoupon}
              />
            </MobileOrderSection>

            <FormBottom
              agreements={agreements}
              setAgreements={setAgreements}
              orderItems={orderItems}
              quantities={quantities}
              discount={discount}
              selectedAddress={selectedAddress}
            />
          </FormSection>

          <OrderSection>
            <Order
              orderItems={orderItems}
              quantities={quantities}
              setQuantities={setQuantities}
              discount={discount}
              couponName={selectedCoupon}
            />
          </OrderSection>
        </PageContent>

        <CouponModal
          isOpen={isCouponModalOpen}
          onClose={closeCouponModal}
          couponNumber={couponNumber}
          setCouponNumber={setCouponNumber}
          selectedCoupon={selectedCoupon}
          setSelectedCoupon={setSelectedCoupon}
          couponDropdownOpen={couponDropdownOpen}
          toggleCouponDropdown={toggleCouponDropdown}
          applyCoupon={applyCoupon}
        />
      </Container>
    </>
  );
};

export default Payment;
