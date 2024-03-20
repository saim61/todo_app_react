import Auth from "../auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addnewUser } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import "./signup.style.css";
import { ValidateEmail } from "../../../utillz/email-validator";
import { useState, useMemo } from "react";
const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, success, loading } = useSelector(
    (state) => state.Auth
  );
  const repassError = useMemo(() => {
    if (rePassword === password) {
      return false;
    }
    return true;
  }, [rePassword, password]);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  const onRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };
  const onEmailChange = (e) => {
    setEmailError(false);
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };
  const checkPassword = () => {
    if (password.length >= 8) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };
  const checkEmail = () => {
    if (ValidateEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  const onSignUpClick = () => {
    if (email && password && name && rePassword) {
      checkEmail();
      checkPassword();
      if (!repassError && !nameError && !emailError && !passwordError) {
        dispatch(addnewUser({ username: name, email, password }));
      }
    } else {
      if (!email) {
        setEmailError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
      if (!name) {
        setNameError(true);
      }
    }
  };

  const onCancelClick = () => {
    setEmailError(false);
    setPasswordError(false);
    setNameError(false);
    setEmail("");
    setPassword("");
    setName("");
    navigate("/login");
  };
  return (
    <Auth>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="container-header">
            <label className="header-label">Sign Up</label>
          </div>
          <div className="field-container">
            <label className="field-label">Name</label>
            <input
              value={name}
              onChange={onNameChange}
              className={`field-input ${
                nameError ? "field-input-error" : "field-input-no-error"
              }`}
              type="email"
            />
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
            <label className="field-label">Re-Password</label>
            <input
              value={rePassword}
              onChange={onRePasswordChange}
              className={`field-input ${
                repassError ? "field-input-error" : "field-input-no-error"
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
                onClick={onSignUpClick}
              >
                Signup
              </button>
            </div>
          </div>
        </>
      )}
    </Auth>
  );
};

export default Signup;
