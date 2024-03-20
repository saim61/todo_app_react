import Create from "../../modals/create";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { user } = useSelector((state) => state.Auth);
  const onCreateClick = () => {
    setIsCreateOpen((isCreateOpen) => !isCreateOpen);
  };
  const onLogoutClick = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      {isCreateOpen && <Create setIsCreateOpen={setIsCreateOpen} />}
      <div style={{ width: "100vw", boxSizing: "border-box", padding: "5px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "5px",
            justifyContent: "space-between",
            border: "1px solid black",
          }}
        >
          <label>Hello {user.name}</label>
          <label> My TODO</label>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <button
              style={{
                border: "none",
                background: "#acdfdd",
                borderRadius: "10px",
                cursor: "pointer",
                padding: "10px",
              }}
              onClick={onCreateClick}
            >
              + Create
            </button>
            <button
              style={{
                border: "none",
                background: "#dfacae",
                borderRadius: "10px",
                cursor: "pointer",
                padding: "10px",
              }}
              onClick={onLogoutClick}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
