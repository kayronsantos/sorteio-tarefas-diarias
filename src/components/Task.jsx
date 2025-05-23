import { useState } from 'react';
import styles from '../styles/TaskList.module.css';

export default function Task({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    onEdit(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <li className={styles.task}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className={styles.editInput}
          />
          <button onClick={handleSave} className={styles.saveButton}>
            Salvar
          </button>
        </>
      ) : (
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </span>
      )}

      <div className={styles.taskActions}>
        <button onClick={() => setIsEditing(!isEditing)} className={styles.editButton}>
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
        <button onClick={() => onDelete(task.id)} className={styles.deleteButton}>
          Deletar
        </button>
      </div>
    </li>
  );
}