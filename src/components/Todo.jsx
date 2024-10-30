import React, { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() === "") {
      alert("You must write something!");
      return;
    }
    const newTask = { text: inputValue, checked: false };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
      <div className="w-[540px] bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-blue-800 flex items-center mb-6">
          To-Do List
        </h2>
        <div className="flex mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add your task"
            className="flex-grow px-4 py-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyPress={(e) => {
              if (e.key === 'Enter') addTask();
            }}
          />
          <button onClick={addTask} className="px-6 py-2 bg-red-500 text-white rounded-r-full hover:bg-red-600 transition duration-200">
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 mb-2 rounded-lg shadow ${
                task.checked
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gray-200 text-gray-800"
              } cursor-pointer`}
              onClick={() => toggleTask(index)}
            >
              <div className="flex items-center">
                {task.checked ? (
                  <FaCircleCheck className="h-6 w-6 text-green-500 mr-3" />
                ) : (
                  <FaRegCircle className="h-6 w-6 text-gray-400 mr-3" />
                )}
                <span>{task.text}</span>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTask(index);
                }}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks added yet!</p>
        )}
      </div>
  );
};

export default Todo
