import "./featured.css";
import useFetch from "../../hooks/useFecth";

const PHOTO_URL = process.env.REACT_APP_PHOTO_URL;

const Featured = () => {
  // const { data, loading, error, reFetchData } = useFetch(url);

  return (
    <div className="featured">
      <div className="featuredItem">
        <img src={PHOTO_URL} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Dublin</h1>
          <h2>123 properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src={PHOTO_URL} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Reno</h1>
          <h2>533 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src={PHOTO_URL} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Austin</h1>
          <h2>532 properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
