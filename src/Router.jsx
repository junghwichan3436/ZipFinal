import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/commerce/Home";
import Detail from "./pages/commerce/Detail";
import Event from "./pages/commerce/eventpages/Event";
import Ott from "./pages/ott/Ott";
import FilterCategory from "./pages/commerce/FilterCategory";
import Cart from "./pages/commerce/Cart";
import Login from "./pages/commerce/Login";
import Signup from "./pages/commerce/Signup";
import Search from "./pages/commerce/Search";
import Payment from "./pages/commerce/Payment";
import Mypage from "./pages/commerce/mypages/Mypage";
import MypageMain from "./pages/commerce/mypages/MypageMain";
import OrderConfirmation from "./pages/commerce/mypages/OrderConfirmation";
import FAQ from "./pages/commerce/mypages/FAQ";
import DeleteAccount from "./pages/commerce/mypages/DeleteAccount";
import ChangeUserInfo from "./pages/commerce/mypages/ChangeUserInfo";
import UserAddress from "./pages/commerce/mypages/UserAddress";
import Promotion from "./pages/commerce/eventpages/Influencer";
import IntroduceTattoo from "./pages/commerce/eventpages/IntroduceTattoo";
import Star from "./pages/commerce/Star";
import StarDetail from "./pages/commerce/StarDetail";
import Original from "./pages/ott/Original";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "detail/:itemName",
        element: <Detail />,
      },
      {
        path: "event",
        element: <Event />,
        children: [
          {
            index: true,
            element: <IntroduceTattoo />,
          },
          {
            path: "promotion",
            element: <Promotion />,
          },
        ],
      },
      {
        path: "filtercategory/:categoryName",
        element: <FilterCategory />,
      },
      {
        path: "star",
        element: <Star />,
      },
      {
        path: "star/:starName",
        element: <StarDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "search/:name",
        element: <Search />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "mypage",
        element: <Mypage />,
        children: [
          {
            index: true,
            element: <MypageMain />,
          },
          {
            path: "order-confirmation",
            element: <OrderConfirmation />,
          },
          {
            path: "faq",
            element: <FAQ />,
          },
          {
            path: "delete-account",
            element: <DeleteAccount />,
          },
          {
            path: "change-user-info",
            element: <ChangeUserInfo />,
          },
          {
            path: "user-address",
            element: <UserAddress />,
          },
        ],
      },
    ],
  },
  {
    path: "/ott",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Ott />,
      },
      {
        path: "original",
        element: <Original />,
      },
    ],
  },
]);
