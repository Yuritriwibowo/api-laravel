import { useEffect, useState } from "react";
import api from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const loadTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    await api.post("/todos", { title });
    setTitle("");
    loadTodos();
  };

  const toggleTodo = async (id, completed) => {
    await api.put(`/todos/${id}`, { completed: !completed });
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App (Laravel + React)</h1>

      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <span 
              onClick={() => toggleTodo(t.id, t.completed)}
              style={{ cursor: "pointer", textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.title}
            </span>

            {" "}
            <button onClick={() => deleteTodo(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
