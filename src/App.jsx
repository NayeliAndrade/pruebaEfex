import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Leer las tareas desde localStorage cuando el componente se monte
   // Solo se ejecuta una vez al montar el componente
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updateTask = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updateTask);
  };

  const deleteTask = (index) => {
    const updateTask = tasks.filter((_, i) => i !== index);
    setTasks(updateTask);
  };

  const filteredTask = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 p-5">
        <h1 className="text-center text-4xl font-bold mb-4 text-blue-600">To-Do List</h1>

        <div className="flex mb-4">
          <input
            className="flex-grow p-2 border border-blue-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Agregar nueva tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300"
          >
            Agregar
          </button>
        </div>

        <div className="mb-4 space-x-2 text-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
          >
            Completadas
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
          >
            Pendientes
          </button>
        </div>

        <ul className="space-y-3">
          {filteredTask.map((task, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
              <span
                className={`text-lg max-w-md truncate ${task.completed ? 'line-through text-gray-500' : 'text-black'} font-medium`}
              >
                {task.text}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => toggleTask(index)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                >
                  {task.completed ? "Pendiente" : "Completa"}
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
