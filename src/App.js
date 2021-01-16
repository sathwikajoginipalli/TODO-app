import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import Home from './Home'
import Menu from './Menu'
import Hero from './Hero'
import Footer from './Footer'
import uuidv4 from 'uuid/v4'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <Router>
    <Menu/>
    <Hero/>
    <div className="mainContainer">
      <Switch>
        <Route path="/todo">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
    <Footer/>
    </Router>
  )
}

export default App;
