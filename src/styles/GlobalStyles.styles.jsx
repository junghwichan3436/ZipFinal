import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../fonts/EHNormalTrial-Regular.otf";
const GlobalStyles = createGlobalStyle`
${reset}

*{
  box-sizing: border-box;
}

ul,li{
  list-style: none;
}

a{
  text-decoration: none;
  color:inherit;
}

:root {
  --light-color: #fff;
  --dark-color: #000;
  --border-color: #ccc;
  --accent: #dc143c;
  --subTitle: #838383;
  --lightGray: #D3D3D3;
  --event-color: #ACE0FF;
  --ott-bg-color: #0E100F;
}

html {
  font-size: 62.5%;
}

body{
  font-size: 1.6rem;
  font-family: "Pretendard";
  background: var(--light-color);
  overflow-x: hidden;
}

/* mansoryCss */
.my-masonry-grid {
  display: -webkit-box; /* Not needed if autoprefixing */
  display: -ms-flexbox; /* Not needed if autoprefixing */
  display: flex;
  align-items: start;
  margin-left: -30px; /* gutter size offset */
  width: auto;
}
.my-masonry-grid_column {
  padding-left: 30px; /* gutter size */
  background-clip: padding-box;
}

/* Style your items */
.my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
  margin-bottom: 30px;
}

@font-face {
  font-family: "EHNormalTrial";
  src: url("/fonts/EHNormalTrial-Thin.otf") format("truetype");
  font-weight: 300;
}
@font-face {
  font-family: "EHNormalTrial";
  src: url("/fonts/EHNormalTrial-Regular.otf") format("truetype");
  font-weight: 500;
}
@font-face {
  font-family: "EHNormalTrial";
  src: url("/fonts/EHNormalTrial-Bold.otf") format("truetype");
  font-weight: 700;
}
`;

export default GlobalStyles;
