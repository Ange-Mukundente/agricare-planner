import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Crops');

  useEffect(() => {
    axios.get(API_URL).then(response => setTasks(response.data));
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { title, category };
    axios.post(API_URL, newTask).then(response => {
      setTasks([...tasks, response.data]);
      setTitle('');
    });
  };

  const handleDeleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-green-700 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">🚜 AgriCare Planner</h1>
      </header>
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add a New Task</h2>
          <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title (e.g., Water the tomatoes)"
              className="flex-grow p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:border-green-500">
              <option>Crops</option>
              <option>Livestock</option>
              <option>Maintenance</option>
              <option>Planning</option>
            </select>
            <button type="submit" className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-800 transition-colors">
              Add Task
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Current Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? tasks.map(task => (
              <div key={task._id} className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-3 ${task.category === 'Crops' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'}`}>
                    {task.category}
                  </span>
                  <p className="text-lg font-medium text-gray-900">{task.title}</p>
                </div>
                <button onClick={() => handleDeleteTask(task._id)} className="mt-4 text-sm text-red-500 hover:text-red-700 self-end font-semibold">
                  Mark as Done
                </button>
              </div>
            )) : <p className="text-gray-500">No tasks yet. Add one above!</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;