import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('handleSave')
    updateTask(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  return (
    <div className="card mb-3">
      {isEditing ? (
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-2"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
        
          <select
            className="form-select mb-2"
            value={editedTask.category}
            onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Others">Others</option>
          </select>
          <button className="btn btn-success me-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="task-item card shadow-sm mb-3">
        <div className="card-body">
          <h5 className="card-title">{task.title}</h5>
          <p className="card-text">{task.description}</p>
          <p className="card-text">
            <small className="text-muted">Category: {task.category}</small>
          </p>
          <p className="card-text">
            <span
              className={`badge ${
                task.status === "Completed"
                  ? "bg-success"
                  : task.status === "In Progress"
                  ? "bg-warning text-dark"
                  : "bg-secondary"
              }`}
            >
              {task.status}
            </span>
          </p>
          <div className="d-flex">
            <button className="btn btn-primary me-2" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default TaskItem;