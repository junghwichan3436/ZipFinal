import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailItem from "../../components/original/DetailItem";
import styled from "styled-components";

const Container = styled.main`
  background: #0e100f;
`;

const OriginalDetail = () => {
  const { id } = useParams(); // URL 파라미터 가져오기
  const [originalData, setOriginalData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("/API/originalData.json")
      .then((response) => response.json())
      .then((data) => {
        const item = data.originalData.find(
          (item) => String(item.id) === id // id는 문자열이므로 형 변환 필요
        );
        setSelectedItem(item);
      });
  }, [id]);

  return (
    <Container>
      <section>
        {!selectedItem ? (
          <div>로딩 중이요</div>
        ) : (
          <DetailItem
            id={selectedItem.id}
            starName={selectedItem.starName}
            detailImg={selectedItem.detailImg}
            episode={selectedItem.episode}
            thumbnail={selectedItem.thumbnail}
            subTitle={selectedItem.subTitle}
            mainTitle={selectedItem.mainTitle}
            description={selectedItem.description}
            keyword={selectedItem.keyword}
            characterKeyword={selectedItem.characterKeyword}
            characterName={selectedItem.characterName}
          />
        )}
      </section>
    </Container>
  );
};

export default OriginalDetail;
