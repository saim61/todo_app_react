import ModalContainer from "../../containers/modal-container";
import { useSelector } from "react-redux";
const View = ({ setIsViewOpen, title, description }) => {
  const { user } = useSelector((state) => state.Auth);
  const onCancelClick = () => {
    setIsViewOpen(false);
  };
  return (
    <ModalContainer>
      <div className="create-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <label style={{ fontSize: "large", fontWeight: "strong" }}>
              Edit The Todo Item
            </label>
            <label onClick={onCancelClick}>X</label>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              padding: "10px",
            }}
          >
            <label
              style={{ fontSize: "large", fontWeight: "strong", width: "30%" }}
            >
              Title
            </label>
            <label style={{ fontSize: "large" }}>{title}</label>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              padding: "10px",
            }}
          >
            <label
              style={{ fontSize: "large", fontWeight: "strong", width: "30%" }}
            >
              Description
            </label>
            <label style={{ fontSize: "large" }}>{description}</label>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              padding: "10px",
            }}
          >
            <label
              style={{ fontSize: "large", fontWeight: "strong", width: "30%" }}
            >
              Created By
            </label>
            <label style={{ fontSize: "large" }}>{user.name}</label>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default View;
