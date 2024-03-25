/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts/TodoContext";

import './App.css'
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItems";


function App() {

const [Todos, setTodos] = useState([]);



const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]);
    // console.log(todo)
    console.log(Todos)
}


const updatedTodo = (id, todo) => {

    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))


}

const deleteTodo = (id) => {

    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
}


const toggleComplete = (id) => {

    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))
}



useEffect(() => {

    const todos = JSON.parse(localStorage.getItem("todos"));


    // eslint-disable-next-line no-empty
    if (todos && todos.length > 0) {
        
        setTodos(todos);

    }
 
}, [])



useEffect(() => {
  
    localStorage.setItem("todos", JSON.stringify(Todos));
    
}, [Todos])


  return (
   <TodoProvider  value={{ Todos, addTodo, updatedTodo , deleteTodo , toggleComplete}}>
    <div className="bg-[#19191f] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className=" text-2xl font-bold text-center mb-8 mt-2">Your Task Tracker</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {Todos.map((todo) => (
                            <div key={todo.id} todo className="w-full">
                            <TodoItem todo={todo}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
   </TodoProvider>
  )
}

export default App
