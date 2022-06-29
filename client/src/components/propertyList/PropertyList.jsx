import "./propertyList.css";
import useFetch from "../../hooks/useFecth";
import Loading from "../../components/loading/Loading";
import { PHOTO_URL } from "../../constants/common.constants";
import { countByTypeURL } from "../../constants/url.constants";

const PropertyList = () => {
  const { data, loading, error, reFetchData } = useFetch(countByTypeURL);
  // console.log("property list", data);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="pList">
      {data &&
        data.map((item, index) => (
          <div className="pListItem" key={index}>
            <img src={PHOTO_URL} alt="" className="pListImg" />
            <div className="pListTitles">
              <p>{item?.type}</p>
              <p>{`${item?.count} ${item.type}`}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PropertyList;
