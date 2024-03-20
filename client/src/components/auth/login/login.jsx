import Auth from "../auth";
import "./login.style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ValidateEmail } from "../../../utillz/email-validator";
import { loginUser, updateSettings } from "../../../redux/authSlice";
import { useSelector } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  useEffect(() => {
    dispatch(updateSettings());
  }, [dispatch]);
  const onEmailChange = (e) => {
    setEmailError(false);
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  const checkPassword = () => {
    if (password.length < 8) {
      setPasswordError(true);
    }
  };
  const checkEmail = () => {
    if (!ValidateEmail(email)) {
      setEmailError(true);
    }
  };
  const onLoginClick = () => {
    if (email && password) {
      checkEmail();
      checkPassword();
      if (ValidateEmail(email) && password.length >= 8) {
        dispatch(loginUser({ email, password }));
      }
    } else {
      if (!email) {
        setEmailError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
    }
  };

  const onCancelClick = () => {
    setEmailError(false);
    setPasswordError(false);
    setEmail("");
    setPassword("");
  };

  const onSignUpClick = () => {
    navigate("/signup");
  };
  return (
    <Auth>
      {loading ? (
        <label>Loading...</label>
      ) : (
        <>
          <div className="container-header">
            <label className="header-label">Login</label>
          </div>
          <div className="field-container">
            <label className="field-label">Email</label>
            <input
              value={email}
              onChange={onEmailChange}
              className={`field-input ${
                emailError ? "field-input-error" : "field-input-no-error"
              }`}
              type="email"
            />
          </div>
          <div className="field-container">
            <label className="field-label">Password</label>
            <input
              value={password}
              onChange={onPasswordChange}
              className={`field-input ${
                passwordError ? "field-input-error" : "field-input-no-error"
              }`}
              type="password"
            />
          </div>
          <div className="field-container">
            <div className="field-button-container">
              <button
                className="field-button"
                style={{ background: "#acdfdd" }}
                onClick={onCancelClick}
              >
                Cancel
              </button>
              <button
                className="field-button"
                style={{ background: "#dfacae" }}
                onClick={onLoginClick}
              >
                Login
              </button>
            </div>
          </div>
          <div
            style={{ display: "flex", flex: "1", justifyContent: "flex-end" }}
          >
            <label
              style={{ fontSize: "small", textDecoration: "underline" }}
              onClick={onSignUpClick}
            >
              Not a member? Signup
            </label>
          </div>
        </>
      )}
    </Auth>
  );
};

export default Login;
