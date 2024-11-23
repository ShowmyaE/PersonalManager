import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-center">No tasks to display.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;