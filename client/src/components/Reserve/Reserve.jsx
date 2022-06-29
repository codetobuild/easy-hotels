import { useEffect, useState, useContext } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFecth";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { getHotelRoomURL } from "../../constants/url.constants";
import Loading from "../loading/Loading";
import "./Reserve.css";

const Reserve = (props) => {
  const { setOpenReserveModal, hotelId, totalDays, roomPrice } = props;
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [reserveDates, setReserveDates] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [roomSubmitStatus, setRoomSubmitStatus] = useState(null);
  const [totalSelectedRooms, setTotalSelectedRooms] = useState(0);
  const navigate = useNavigate();

  const { dates } = useContext(SearchContext);

  const url = `${getHotelRoomURL}/${hotelId}`;
  const { data: rooms, loading, error } = useFetch(url);
  // console.log("hotel rooms", rooms);

  // console.log("reserveDates", reserveDates);

  useEffect(() => {
    const allDates = getDateInRange(dates[0]?.startDate, dates[0]?.endDate);
    setReserveDates(() => [...allDates]);
  }, []);

  useEffect(() => {
    setTotalSelectedRooms(selectedRooms.length);
  }, [selectedRooms]);

  useEffect(() => {
    setAllRooms((prev) => rooms || []);
  }, [rooms]);

  const isAvailable = (roomNumber) => {
    const currRoomUnavailableDates = roomNumber.unavailableDates.map((d) =>
      new Date(d).getTime()
    );

    const unavailableDatesFound = currRoomUnavailableDates.some((dt) =>
      reserveDates.includes(dt)
    );
    // console.log(currRoomUnavailableDates, reserveDates);
    return !unavailableDatesFound;
  };

  const handleRoomSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    let currSelectedRooms = [...selectedRooms];
    console.log(checked, value);
    if (checked) {
      currSelectedRooms = [...selectedRooms, value];
    } else {
      currSelectedRooms = [...selectedRooms.filter((item) => item !== value)];
    }
    setSelectedRooms(() => currSelectedRooms);
  };

  const handleRoomSubmit = async (e) => {
    if (totalSelectedRooms === 0) {
      return;
    }

    navigate("/payment", {
      state: {
        totalSelectedRooms,
        selectedRooms,
        reserveDates,
        totalDays,
        roomPrice,
      },
    });

    // try {
    //   await Promise.all(
    //     selectedRooms.map((roomId) => {
    //       const url = `${process.env.REACT_APP_BASE_URL}/rooms/availability/${roomId}`;
    //       const res = axios.put(url, {
    //         dates: reserveDates,
    //       });
    //       return res.data;
    //     })
    //   );

    //   setRoomSubmitStatus({ status: true, msg: "Room reservation success" });
    // } catch (err) {
    //   setRoomSubmitStatus({ status: false, msg: "Room reservation failure" });
    //   console.log(err);
    // }

    // setTimeout(() => {
    //   setRoomSubmitStatus(null);
    //   setOpenReserveModal(false);
    //   navigate("/");
    // }, 2000);
  };

  useEffect(() => {
    // console.log("currSelectedRooms", selectedRooms);
  }, [selectedRooms]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="rModalWrapper">
        <div className="rModalContainer">
          <button
            onClick={() => setOpenReserveModal(false)}
            className="rModalCloseBtn">
            X
          </button>
          <h1 className="rModalTitle">Reserve Availble Rooms</h1>
          <div className="rModalMain">
            {allRooms?.map((room, index) => (
              <div key={index} className="rModalItem">
                <div className="rModalItemDesc">
                  <p>Title: {room.title}</p>
                  <p>Price: {room.price}</p>
                  <p>{room.desc}</p>
                </div>
                <div className="rModalItemRoom">
                  <p>Room Numbers</p>
                  {room?.roomNumbers?.map((roomNumber, index) => (
                    <div classname="rModalRoomNumber">
                      <label className="rModalLabel">{roomNumber.number}</label>
                      <input
                        classname="rModalCheckbox"
                        type="checkbox"
                        value={roomNumber._id}
                        disabled={!isAvailable(roomNumber)}
                        onChange={handleRoomSelect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="roomSubmitBtnWrapper">
            <button
              className="roomSubmitBtn"
              onClick={handleRoomSubmit}
              disabled={roomSubmitStatus?.status}>
              Pay & Reserve{" "}
              {totalSelectedRooms ? `(${totalSelectedRooms})` : ""} Rooms →
            </button>
          </div>
          {roomSubmitStatus && (
            <h2
              className={
                roomSubmitStatus.status
                  ? "roomSubmitSuccess"
                  : "roomSubmitFailure"
              }>
              {roomSubmitStatus.msg}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

function getDateInRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const date = new Date(start.getTime());
  let dateList = [];

  while (date <= end) {
    dateList.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }
  // console.log("dates", dateList);
  return dateList;
}

export default Reserve;
