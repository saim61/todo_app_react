import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthUser = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.Auth);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      //navigate("/home");
    }
  }, [navigate, isAuthenticated]);

  return <div>{isAuthenticated && <div> {children} </div>}</div>;
};

export default AuthUser;
