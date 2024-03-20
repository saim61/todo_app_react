import "./auth.style.css";
const Auth = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-inner-container">{children}</div>
    </div>
  );
};

export default Auth;
