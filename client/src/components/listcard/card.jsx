import "./card.styles.css";
import { useState } from "react";
import Delete from "../../modals/delete";
import Edit from "../../modals/edit";
import View from "../../modals/view";
const Card = ({ taskId, title, description }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  function onViewClick() {
    setIsViewOpen((isViewOpen) => !isViewOpen);
  }
  function onDeleteClick() {
    setIsDeleteOpen((isDeleteOpen) => !isDeleteOpen);
  }
  function onEditClick() {
    setIsEditOpen((isEditOpen) => !isEditOpen);
  }
  return (
    <>
      {isViewOpen && (
        <View
          setIsViewOpen={setIsViewOpen}
          id={taskId}
          title={title}
          description={description}
        />
      )}
      {isDeleteOpen && <Delete setIsDeleteOpen={setIsDeleteOpen} id={taskId} />}
      {isEditOpen && (
        <Edit
          setIsEditOpen={setIsEditOpen}
          title={title}
          description={description}
          taskId={taskId}
        />
      )}
      <div className="list-card-container">
        <div className="list-card-title-container">
          <label className="title-label">Title:</label>
          <label>{title}</label>
        </div>
        <div className="list-card-title-container">
          <label className="title-label">Description:</label>
          <label>{description}</label>
        </div>
        <div className="list-card-title-container">
          <div className="list-card-button-container">
            <button
              style={{
                padding: "10px",
                background: "#dfacc7",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={onViewClick}
            >
              View
            </button>
            <button
              style={{
                padding: "10px",
                background: "#acdfdd",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={onEditClick}
            >
              Edit
            </button>
            <button
              style={{
                padding: "10px",
                background: "#dfacae",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={onDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
