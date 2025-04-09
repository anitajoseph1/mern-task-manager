import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    await createTask(task);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await updateTask(task._id, { completed: !task.completed });
    fetchTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.user.username}</h1>
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} removeTask={removeTask} />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
