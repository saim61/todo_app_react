import "./edit.styles.css";
import ModalContainer from "../../containers/modal-container";

import { editTask } from "../../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
const Edit = ({ setIsEditOpen, title, description, taskId }) => {
  const { user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const [currentTitle, setCurrentTitle] = useState(title);
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(description);
  const onCancelClick = () => {
    setIsEditOpen(false);
  };
  const onEditClick = () => {
    if (currentTitle && currentDescription) {
      dispatch(
        editTask({
          id: taskId,
          title: currentTitle,
          description: currentDescription,
          createdBy: user.id,
        })
      );
      setIsEditOpen(false);
    } else {
      if (!currentTitle) {
        setTitleError(true);
      }
      if (!currentDescription) {
        setDescError(true);
      }
    }
  };
  const onTitleChange = (e) => {
    setTitleError(false);
    setCurrentTitle(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescError(false);
    setCurrentDescription(e.target.value);
  };
  return (
    <ModalContainer>
      <div className="edit-container">
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
            <input
              onChange={onTitleChange}
              value={currentTitle}
              placeholder="Enter the Title"
              style={{
                background: "transparent",
                outline: "none",
                border: "none",
                color: "white",
                borderBottom: `1px solid ${titleError ? "red" : "white"}`,
                width: "50%",
              }}
            />
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
            <input
              onChange={onDescriptionChange}
              value={currentDescription}
              placeholder="Enter the Description"
              style={{
                background: "transparent",
                outline: "none",
                border: "none",
                color: "white",
                borderBottom: `1px solid ${descError ? "red" : "white"}`,
                width: "50%",
              }}
            />
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
                onClick={onEditClick}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Edit;
