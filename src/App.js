import React, { useState, useEffect } from "react";
import TaskForm from "./Components/TaskForm/TaskForm";
import TaskList from "./Components/TaskList/TaskList";
import SearchBar from "./Components/SearchBox/SearchBox";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getdata()
  }, [searchQuery]);

  const fetchNotes = (query) => {
    axios
      .get("https://backendpersonal.onrender.com/notesFilter", {
        params: { search: query },
      })
      .then((response) => {
          setTasks(response.data)
        })
      .catch((error) => console.error("Error fetching notes:", error));
  }

  const getdata = () => {
    if(searchQuery && searchQuery != '') {
      fetchNotes(searchQuery)
    }
    else {
      axios.get("https://backendpersonal.onrender.com/notes").then((response) => {
        setTasks(response.data);
      })
        .catch((error) => console.error("Error fetching notes:", error));
    }

  };


  const addTask = (newNote) => {
    if (editingNote) {
      axios
        .put(`https://backendpersonal.onrender.com/notes/${editingNote.id}`, newNote)
        .then(() => {
          setTasks(tasks.map((note) => (note.id === editingNote.id ? newNote : note)));
          setEditingNote(null);
          getdata()
        })
        .catch((error) => console.error("Error fetching notes:", error));
    } else {
      // Add new note
      axios.post("https://backendpersonal.onrender.com/notes", newNote).then((response) => {
        setTasks([...tasks, response.data]);
        getdata()
      })
        .catch((error) => console.error("Error fetching notes:", error));
    }
  };

  const deleteTask = (id) => {
    axios.delete(`https://backendpersonal.onrender.com/notes/${id}`).then(() => {
      setTasks(tasks.filter((note) => note.id !== id));
    })
      .catch((error) => console.error("Error fetching notes:", error));
  };
  const updateTask = (noteEdit) => {
    console.log("UPDATE", noteEdit)
    setEditingNote(noteEdit);
    axios
      .put(`https://backendpersonal.onrender.com/notes/${noteEdit.id}`, noteEdit)
      .then(() => {
        setTasks(tasks.map((note) => (note.id === noteEdit.id ? noteEdit : note)));
        setEditingNote(null);
        getdata()
      })
      .catch((error) => console.error("Error fetching notes:", error));
  };

  return (
    <div className="container-fluid app-container">
      <h1 className="text-center my-4">Task Manager</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          {/* <button className="button1" onClick={onAdd}>Add Task</button> */}
          <SearchBar onSearch={setSearchQuery} />
          <TaskForm addTask={addTask} />
          <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
}

export default App;