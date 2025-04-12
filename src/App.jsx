import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // set input, todos 
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  

  // Load from localstorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  },[]);

  // Save to localstorage on todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos]);

  const handelAdd = () => {
    if (input.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: input
    }

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className='container'>
      <h1>TODO List</h1>
      <div className='input-section'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter a todo'
        />
        <button onClick={handelAdd}>Add</button>
      </div>
      <ul className='todo-list'>
        {todos.map((todo) => (
          <li key={todo.id} className='todo-item'>
            <span>{todo.text}</span>
            <button className='delete-btn' onClick={() => handleDelete(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
