import "./create.style.css";
import { useState } from "react";
import ModalContainer from "../../containers/modal-container";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "../../redux/taskSlice";
import { generateUniqueId } from "../../utillz/randomizer";
const Create = ({ setIsCreateOpen }) => {
  const dispatch = useDispatch();
  const [currentTitle, setCurrentTitle] = useState("");
  const { user } = useSelector((state) => state.Auth);

  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const onCancelClick = () => {
    setIsCreateOpen(false);
  };
  const onCreateClick = () => {
    if (currentTitle && currentDescription) {
      dispatch(
        addNewTask({
          createdBy: user.id,
          taskId: generateUniqueId(),
          title: currentTitle,
          description: currentDescription,
        })
      );
      setIsCreateOpen(false);
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
              Create New Todo Item
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
                onClick={onCreateClick}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Create;
