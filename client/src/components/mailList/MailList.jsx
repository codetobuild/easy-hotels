import "./mailList.css";
import InputElement from "../form/InputElement";
import Button from "../button/Button";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <InputElement type="text" styleCSS={{ height: "40px" }} />
        <Button
          btnText="Subscribe"
          styleCSS={{ height: "40px", fontSize: "16px" }}
        />
      </div>
    </div>
  );
};

export default MailList;
