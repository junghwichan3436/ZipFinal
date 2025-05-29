import { useParams } from "react-router-dom";
import FilterComp from "../../components/detail/FilterComp";

const FilterCategory = () => {
  const { categoryName } = useParams();
  return <FilterComp categoryName={categoryName} />;
};

export default FilterCategory;
