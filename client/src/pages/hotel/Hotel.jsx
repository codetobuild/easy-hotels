import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Reserve from "../../components/Reserve/Reserve";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../components/loading/Loading";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { getHotelURL } from "../../constants/url.constants";
import useFetch from "../../hooks/useFecth";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openReserveModal, setOpenReserveModal] = useState(false);
  const [totalDays, setTotalDays] = useState(1);
  const [roomPrice, setRoomPrice] = useState(0);
  const [hotelImages, setHotelImages] = useState([]);

  const params = useParams();
  const hotelId = params.id;
  const navigate = useNavigate();
  // const location = useLocation();

  const { user } = useContext(AuthContext);
  const { data, loading, error, reFetchData } = useFetch(
    `${getHotelURL}/${hotelId}`
  );

  const { dates, options } = useContext(SearchContext);

  useEffect(() => {
    // console.log("hotel data", data);
    const cheapestPrice = data?.cheapestPrice || 0;
    setRoomPrice(cheapestPrice);

    const images = data?.photos.map((item) => item) || [];
    setHotelImages((prev) => [...images]);
  }, [data]);

  useEffect(() => {
    const { startDate, endDate } = dates[0] || {
      startDate: new Date(),
      endDate: new Date(),
    };
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const millisecondPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.ceil(diffTime / millisecondPerDay);
    setTotalDays((prev) => diffDays + 1);
  }, [dates]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleImageArrow = (direction) => {
    let newSlideNumber;
    const imageCount = hotelImages.length;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? imageCount - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === imageCount - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const hanldeReserveBtnClick = (e) => {
    if (user) {
      setOpenReserveModal(true);
    } else {
      navigate("/login");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    data && (
      <div>
        <Navbar />
        <Header type="list" />
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleImageArrow("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={hotelImages[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleImageArrow("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={hanldeReserveBtnClick}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data?.title}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data?.city}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – 500m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data?.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data?.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of City</h1>
                <p className="hotelDesc">
                  Located a 5-minute walk from St. Florian's Gate in Krakow,
                  Tower Street Apartments has accommodations with air
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a 9-night stay!</h1>
                <p>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </p>
                <h2>
                  <b>${totalDays * roomPrice * options.room}</b> ({totalDays}{" "}
                  nights)
                </h2>
                <button onClick={hanldeReserveBtnClick}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          {openReserveModal && (
            <Reserve
              openReserveModal={openReserveModal}
              setOpenReserveModal={setOpenReserveModal}
              hotelId={hotelId}
              totalDays={totalDays}
              roomPrice={roomPrice}
            />
          )}
          <MailList />
          <Footer />
        </div>
      </div>
    )
  );
};

export default Hotel;
