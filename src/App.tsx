import { useState, useEffect } from "react";
import initialTask from "./data/data";
import type { Task } from "./types/types";
import { Container, Button, Row, Col } from "react-bootstrap";
import TaskBoard from "./components/TaskBoard";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTask);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (newTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleUpdateTask = (taskId: string, updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? updatedTask : task
      )
    );
  };

  console.log(initialTask);
  return (
    <Container className="my-4">
      {/* Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
      >
        <i className={isDarkTheme ? "bi bi-sun" : "bi bi-moon"}></i>
      </button>

      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Task Management</h1>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary" 
            onClick={() => setShowAddModal(true)}
            className="px-4"
          >
            + Add New Task
          </Button>
        </Col>
      </Row>
      <TaskBoard tasks={tasks} setTasks={setTasks} onEditTask={handleEditTask} />
      
      {/* Add Task Modal */}
      <AddTaskForm 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)} 
        onAddTask={handleAddTask} 
      />
      
      {/* Edit Task Modal */}
      <EditTaskForm
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onEditTask={handleUpdateTask}
        task={editingTask}
      />
    </Container>
  );
}

export default App;
