import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/commerce/Home";
import Detail from "./pages/commerce/Detail";
import Event from "./pages/commerce/eventpages/Event";
import Ott from "./pages/ott/Ott";
import FilterCategory from "./pages/commerce/FilterCategory";
import Cart from "./pages/commerce/Cart";
import Login from "./pages/commerce/Login";
import Signup from "./pages/commerce/signuppages/Signup";
import Signupv2 from "./pages/commerce/signuppages/Signupv2";
import Search from "./pages/commerce/Search";
import Payment from "./pages/commerce/Payment";
import Mypage from "./pages/commerce/mypages/Mypage";
import MypageMain from "./pages/commerce/mypages/MypageMain";
import OrderConfirmation from "./pages/commerce/mypages/OrderConfirmation";
import FAQ from "./pages/commerce/mypages/FAQ";
import DeleteAccount from "./pages/commerce/mypages/DeleteAccount";
import ChangeUserInfo from "./pages/commerce/mypages/ChangeUserInfo";
import FavoriteArtist from "./pages/commerce/mypages/FavoriteArtist";
import UserAddress from "./pages/commerce/mypages/UserAddress";
import Promotion from "./pages/commerce/eventpages/Influencer";
import IntroduceTattoo from "./pages/commerce/eventpages/IntroduceTattoo";
import Star from "./pages/commerce/Star";
import StarDetail from "./pages/commerce/StarDetail";
import Original from "./pages/ott/Original";
import OriginalDetail from "./pages/ott/OriginalDetail";
import Short from "./pages/ott/Short";

import InMyBag from "./pages/ott/InMyBag";
import OttDetail from "./pages/ott/OttDetail";
import Talk from "./pages/ott/Talk";
import Work from "./pages/ott/Work";
import OttSearchComp from "./components/common/OttSearchComp";
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
        path: "signupv2",
        element: <Signupv2 />,
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
          {
            path: "FavoriteArtist",
            element: <FavoriteArtist />,
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
      {
        path: "originalDetail/:id",
        element: <OriginalDetail />,
      },
      {
        path: "short",
        element: <Short />,
      },
      {
        path: "bagzip",
        element: <InMyBag />,
      },
      {
        path: "workzip",
        element: <Work />,
      },
      {
        path: "talkzip",
        element: <Talk />,
      },
      {
        path: "detail/:title",
        element: <OttDetail />,
      },
      {
        path: "search/:query",
        element: <OttSearchComp />,
      },
    ],
  },
]);
