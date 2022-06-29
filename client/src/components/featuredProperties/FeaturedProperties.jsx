import "./featuredProperties.css";
import useFetch from "../../hooks/useFecth";
import Loading from "../loading/Loading";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const url = `${process.env.REACT_APP_BASE_URL}/hotels`;

const FeaturedProperties = () => {
  const { data, loading, error, reFetchData } = useFetch(url);

  // console.log("featuredProperties", data);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="fp">
      {data &&
        data.map((item, index) => (
          <div className="fpItem" key={item._id}>
            <img src={item.photos[0]} alt="" className="fpImg" />
            <div className="fpDetails">
              <p className="fpName">{item?.title}</p>
              <div className="fpLocation">
                <FontAwesomeIcon icon={faLocationDot} />
                <p className="fpCity">{item?.city}</p>
              </div>
              <p className="fpPrice">Starting from ${item.cheapestPrice}</p>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeaturedProperties;
