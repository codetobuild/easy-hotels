import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { loginUserURL } from "../../constants/url.constants";
import InputElement from "../../components/form/InputElement";
import Label from "../../components/form/Label";
import style from "../register/register.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginBtnClicked = (e) => {
    e.preventDefault();
    // console.log(credentials);
    dispatch({ type: "LOGIN_START" });
    const loginUser = async () => {
      try {
        const res = await axios.post(loginUserURL, credentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
        // console.log(err);
      }
    };
    loginUser();
  };

  return (
    <div className={`${style.formWrapper}`}>
      <form
        onSubmit={handleLoginBtnClicked}
        className={`${style.formContainer}`}>
        <h1 className={`${style.formTitle}`}>Login</h1>
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
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <button type="submit" className={`${style.formBtn}`}>
          Login →
        </button>
      </form>
    </div>
  );
};

export default Login;
