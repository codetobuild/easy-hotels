import { useEffect, useState, useContext } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFecth";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getHotelRoomURL } from "../../constants/url.constants";
import Loading from "../loading/Loading";
import { reserveRoom } from "../../services/hotel/reserveRoom";

import style from "./payment.module.css";
import Button from "../button/Button";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedRooms, reserveDates } = location.state;

  const initPayment = async (data) => {
    const options = {
      key: "rzp_test_stp7BSCGIrAM0n",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${process.env.REACT_APP_BASE_URL}/payment/verify`;
          const { data } = await axios.post(verifyUrl, response);
          // console.log(data);
          // make reservation after payment
          await reserveRoom({ selectedRooms, reserveDates });
          // console.log("room reservation success");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = `${process.env.REACT_APP_BASE_URL}/payment/order`;
      const { data } = await axios.post(orderUrl, { amount: 1234 });
      // console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log({ selectedRooms, reserveDates });

  return (
    <div className={`${style.summaryWrapper}`}>
      <div className={`${style.summaryContainer}`}>
        <h3 className={`${style.summaryTitle}`}>Reservation summary</h3>
        <div className={`${style.summaryDetails}`}>
          <div className={`${style.summaryItem}`}>
            <p>Reserve Dates:</p>
            <p>dates</p>
          </div>
          <div className={`${style.summaryItem}`}>
            <p>Sing Room Price:</p>
            <p>1232</p>
          </div>
          <div className={`${style.summaryItem}`}>
            <p>Total Rooms:</p>
            <p>3</p>
          </div>

          <div className={`${style.summaryItem} ${style.totalPrice}`}>
            <p>Total Price:</p>
            <p>21241</p>
          </div>
        </div>
        <div className={`${style.payBtnWrapper}`}>
          <Button
            btnText="Proceed to pay"
            handleClick={handlePayment}
            className={`${style.payBtn}`}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * 
 * reserveDates: [1656170997885]
roomPrice: 200
selectedRooms: (2) ['62a49b3f28761c692912790a', '62a49b3f28761c6929127909']
totalDays: 1
totalSelectedRooms: 2
 * 
 */

export default Payment;
