import { useState } from 'react';
import styles from '../styles/TaskList.module.css';

export default function AddTask({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
      <input
        type="text"
        placeholder="Adicionar tarefa..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  );
}