import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Toast helper functions
  const showSuccess = (msg) => toast.success(msg, { position: "top-right" });
  const showError = (msg) => toast.error(msg, { position: "top-right" });

  // Register
  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", form);
      showSuccess("Registered successfully!");
    } catch (err) {
      showError(err.response?.data?.msg || "Registration failed");
    }
  };

  // Login
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", form);
      setToken(res.data.token);
      showSuccess("Login successful!");
    } catch (err) {
      showError(err.response?.data?.msg || "Login failed");
    }
  };

  // Logout
  const logout = () => {
    setToken("");
    setTasks([]);
    setForm({ email: "", password: "", name: "" });
    showSuccess("Logged out successfully!");
  };

  // Get Tasks
  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      showError("Failed to fetch tasks");
    }
  };

  // Add Task
  const addTask = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/tasks",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      getTasks();
      showSuccess("Task added successfully!");
    } catch (err) {
      showError("Failed to add task");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
      showSuccess("Task deleted successfully!");
    } catch (err) {
      showError("Failed to delete task");
    }
  };

  return (
    <div className="container">
      <h2
        style={{
          background: "linear-gradient(90deg, #7e57c2, #ab47bc)",
          color: "white",
          padding: "10px 0",
          borderRadius: "10px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        }}
      >
        🚀 Task Manager UI
      </h2>

      {/* Toast Container */}
      <ToastContainer />

      {/* Register / Login */}
      <h3>Register / Login</h3>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>

      {token && (
        <>
          {/* Logout button */}
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <button
              onClick={logout}
              style={{
                backgroundColor: "#ff5252",
                borderRadius: "8px",
                fontWeight: "500",
              }}
            >
              🚪 Logout
            </button>
          </div>

          {/* Add Task */}
          <h3>Add Task</h3>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>

          {/* Task List */}
          <h3>Your Tasks</h3>
          <button onClick={getTasks}>Load Tasks</button>

          <ul>
            {tasks.map((t) => (
              <li key={t._id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <b>{t.title}</b> — {t.description}
                  </span>
                  <button
                    style={{
                      backgroundColor: "#e53935",
                      border: "none",
                      borderRadius: "8px",
                      padding: "5px 10px",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                    onClick={() => deleteTask(t._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
