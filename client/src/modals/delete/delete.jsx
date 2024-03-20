import "./delete.style.css";
import ModalContainer from "../../containers/modal-container";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../redux/taskSlice";
const Delete = ({ setIsDeleteOpen, id }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  const onCancelClick = () => {
    setIsDeleteOpen(false);
  };
  const onDeleteClick = () => {
    dispatch(deleteTask(id, user.id));
    setIsDeleteOpen(false);
  };
  return (
    <ModalContainer>
      <div className="delete-container">
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
              Are You Sure ?
            </label>
            <label onClick={onCancelClick}>X</label>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <label style={{ fontSize: "medium", fontWeight: "strong" }}>
              Are You Sure you want to delete that item from todo-list?
            </label>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                style={{
                  padding: "7px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#acdfdd",
                }}
                onClick={onCancelClick}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "7px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#dfacae",
                }}
                onClick={onDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Delete;