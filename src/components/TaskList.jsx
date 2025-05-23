import Task from './Task';
import styles from '../styles/TaskList.module.css';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <ul className={styles.taskList}>
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}