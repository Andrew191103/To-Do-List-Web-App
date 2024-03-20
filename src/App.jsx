import { useState, useEffect } from "react";
import "./App.css";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from "./firebase/firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [showPopup, setShowPopup] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [filter, setFilter] = useState("All"); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosArray);
    }, (error) => {
      console.error("Error fetching todos: ", error);
      setError("Failed to fetch todos.");
    });
    return () => unsubscribe(); 
  }, []);

  function handlePopupSubmit(e) {
    e.preventDefault();
    console.log("Adding task...");
    if (!newItem.trim()) return;
  
    const todo = {
      text: newItem,
      completed: taskStatus === "Done",
      status: taskStatus 
    };
  
    addDoc(collection(db, "todos"), todo)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setNewItem("");
        setShowPopup(false);
        setTaskStatus("To Do");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  
  function getVisibleTodos() {
    if (filter === "In Progress") {
      return todos.filter((todo) => !todo.completed && todo.status === "In Progress");
    } else if (filter === "Done") {
      return todos.filter((todo) => todo.completed && todo.status === "Done");
    } else if (filter === "To Do") {
      return todos.filter((todo) => !todo.completed && todo.status === "To Do");
    }
    
    return todos;
  }

  function toggleTodo(id, completed) {
    const todoRef = doc(db, "todos", id);
    updateDoc(todoRef, { completed: completed });
  }

  function deleteTodo(id) {
    const todoRef = doc(db, "todos", id);
    deleteDoc(todoRef);
  }

  function toggleEdit(id) {
    setEditingId(id);
    const todo = todos.find(todo => todo.id === id);
    setEditedTitle(todo.text); 
  }

  function handleEdit(id) {
    const todoRef = doc(db, "todos", id);
    updateDoc(todoRef, { text: editedTitle }) 
      .then(() => setEditingId(null));
  }

  return (
    <>
      <div className="App">
        <div className="todo-header">
          <h1 className="header">To-Do List</h1>
          <p style={{ fontSize: 'smaller', marginTop: '-2rem' }}>Andrew Sebastian Sibuea - 2602169711</p>
          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Done">Done</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
    
        <ul className="list">
          {getVisibleTodos().map((todo) => (
            <li key={todo.id} className={`flex justify-between items-center my-2 ${todo.completed ? 'completed' : ''}`}>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={todo.completed} 
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                  className="check"
                />
              </div>
              <div className="task-text">
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="edit-input"
                    autoFocus
                  />
                ) : (
                  <span className={`ml-2 ${todo.Completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                )}
              </div>
              <div className="button-container">
                <button
                  type="button"
                  onClick={() => toggleEdit(todo.id)}
                  className="btn-edit"
                >
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  className="btn-delete"
                >
                  <span>Delete</span>
                </button>
                {editingId === todo.id && (
                  <button
                    type="button"
                    onClick={() => handleEdit(todo.id)}
                    className="btn-save"
                  >
                    <span>Save</span>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
  
      {showPopup && (
        <div className="overlay">
          <div className="modal">
            <form onSubmit={handlePopupSubmit}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <div className="popup-buttons">
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
                <button type="button" className="btn" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      <form className="new-item-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="item">Enter a new task</label>
          <input
            className="input input-alt"
            placeholder="What do you need to do?"
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            style={{
              border: '2px solid #FF6347',
              borderRadius: '5px',
              padding: '10px',
              fontSize: '1rem',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 99, 71, 0.1)',
              color: '#333',
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
          />

          <span className="input-border input-border-alt"></span>
        </div>
        
        <button className="btn" type="button" onClick={() => setShowPopup(true)}>
          <span>Add</span>
        </button>
      </form>
    </>
  );
}

export default App;
