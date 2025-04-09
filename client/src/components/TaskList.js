const TaskList = ({ tasks, toggleComplete, removeTask }) => {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(task)}
            >
              {task.title}
            </span>
            <button onClick={() => removeTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TaskList;
  