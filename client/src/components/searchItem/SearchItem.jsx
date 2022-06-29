import "./searchItem.css";
import { Link } from "react-router-dom";
import { PHOTO_URL } from "../../constants/common.constants.js";
const SearchItem = (props) => {
  const { item } = props;
  // console.log(item);
  return (
    <div className="searchItem">
      <img src={item?.photos[0] || PHOTO_URL} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.title}</h1>
        <span className="siDistance">{item.distance} metres</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`} params={{ testvalue: "hello" }}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
