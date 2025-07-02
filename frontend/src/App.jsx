// frontend/src/App.jsx
import { useState, useEffect } from 'react'; // <--- Make sure both are used
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  // ... rest of the code... NO unused variables
}
  // Fetch tasks on component mount
  useEffect(() => {
    axios.get(API_URL).then(response => {
      setTasks(response.data);
    });
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { title, category: 'General' };
    axios.post(API_URL, newTask).then(response => {
      setTasks([...tasks, response.data]);
      setTitle('');
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-green-700">AgriCare Planner</h1>
        
        <form onSubmit={handleAddTask} className="flex mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-2 border rounded-l-md"
            required
          />
          <button type="submit" className="bg-green-600 text-white p-2 rounded-r-md hover:bg-green-700">
            Add Task
          </button>
        </form>

        <div>
          <h2 className="text-xl font-semibold mb-2">My Tasks</h2>
          <ul>
            {tasks.map(task => (
              <li key={task._id} className="bg-gray-50 p-3 mb-2 rounded-md flex justify-between items-center">
                <span>{task.title}</span>
                <span className="text-sm text-gray-500">{task.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;