import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import styles from './styles/App.module.css';
import { useTheme } from './context/ThemeContext';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Estados
  const [tasks, setTasks] = useState([]);

  // Funções
  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const getRandomTask = () => {
    if (tasks.length === 0) return alert("Adicione tarefas primeiro!");
    const incompleteTasks = tasks.filter(task => !task.completed);
    if (incompleteTasks.length === 0) return alert("Todas as tarefas estão concluídas! 🎉");
    const randomTask = incompleteTasks[Math.floor(Math.random() * incompleteTasks.length)];
    alert(`Tarefa do dia: "${randomTask.text}"`);
  };

  // Effects
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Render
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sorteio de tarefas diárias</h1>
        <div className={styles.themeToggle}>
          <button onClick={toggleTheme} className={styles.themeButton}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
  
      <button onClick={getRandomTask} className={styles.randomButton}>
        Sortear Tarefa do Dia
      </button>
      
      <AddTask onAdd={addTask} />
      <TaskList 
        tasks={tasks} 
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;