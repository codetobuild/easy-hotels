import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { createUserURL } from "../../constants/url.constants";
import InputElement from "../../components/form/InputElement";
import Label from "../../components/form/Label";
import style from "./register.module.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterBtnClicked = (e) => {
    e.preventDefault();
    // console.log(credentials);
    const registerUser = async () => {
      try {
        const res = await axios.post(createUserURL, credentials);
        // console.log(res);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    };
    registerUser();
  };

  return (
    <div className={`${style.formWrapper}`}>
      <form
        onSubmit={handleRegisterBtnClicked}
        className={`${style.formContainer}`}>
        <h1 className={`${style.formTitle}`}>Register</h1>
        <div className={`${style.formField}`}>
          <Label type="input" htmlFor="username" labelText="Username" />
          <InputElement
            name={"username"}
            value={credentials.username}
            type="text"
            handleChange={handleInputChange}
            required={true}
            placeholder="username"
          />
        </div>
        <div className={`${style.formField}`}>
          <Label type="input" htmlFor="email" labelText="Email" />
          <InputElement
            name={"email"}
            value={credentials.email}
            type="email"
            handleChange={handleInputChange}
            required={true}
            placeholder="email"
          />
        </div>
        <div className={`${style.formField}`}>
          <Label type="input" htmlFor="country" labelText="Country" />
          <InputElement
            name={"country"}
            value={credentials.country}
            type="text"
            handleChange={handleInputChange}
            required={true}
            placeholder="country"
          />
        </div>
        <div className={`${style.formField}`}>
          <Label type="input" htmlFor="city" labelText="City" />
          <InputElement
            name={"city"}
            value={credentials.city}
            type="text"
            handleChange={handleInputChange}
            required={true}
            placeholder="city"
          />
        </div>
        <div className={`${style.formField}`}>
          <Label type="input" htmlFor="password" labelText="Password" />
          <InputElement
            name={"password"}
            value={credentials.password}
            type="password"
            handleChange={handleInputChange}
            required={true}
            placeholder="password"
          />
        </div>

        <div className={`${style.formNote}`}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <button type="submit" className={`${style.formBtn}`}>
          Register →
        </button>
      </form>
    </div>
  );
};

export default Register;
