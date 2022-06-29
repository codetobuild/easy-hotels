import { useContext, useEffect } from "react";

import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFecth";
import { SearchContext } from "../../context/SearchContext";
import { getAllHotelURL } from "../../constants/url.constants";
import Loading from "../../components/loading/Loading";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);

  const {
    dates: dateContextVal,
    options: optionsContextVal,
    destination: cityContextVal,
    dispatch,
  } = useContext(SearchContext);

  let urlQuery = `?min=${minPrice}&max=${maxPrice}`;
  if (destination) {
    urlQuery += `&city=${destination}`;
  }
  const { data, loading, error, reFetchData } = useFetch(
    `${getAllHotelURL}${urlQuery}`
  );

  const reFetchHotels = async () => {
    // console.log(destination, dates, options);
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        destination,
        dates,
        options,
      },
    });
    const currUrl = `${getAllHotelURL}${urlQuery}`;
    await reFetchData(currUrl);
    // console.log("hotel list", urlQuery);
  };

  // console.log("hotel list", data);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={reFetchHotels}>Search</button>
          </div>
          <div className="listResult">
            {loading
              ? "loading..."
              : data?.map((item, index) => (
                  <SearchItem key={index} item={item} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
