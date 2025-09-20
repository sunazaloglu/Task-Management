import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { nanoid } from "nanoid";
import type { Task } from "../types/types";

interface AddTaskFormProps {
  show: boolean;
  onHide: () => void;
  onAddTask: (task: Task) => void;
}

function AddTaskForm({ show, onHide, onAddTask }: AddTaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    status: "To Do"
  });

  const statuses = ["To Do", "In Progress", "Review", "Done"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim() && formData.assignee.trim()) {
      const newTask: Task = {
        ...formData,
        id: nanoid(),
      };
      onAddTask(newTask);
      setFormData({ title: "", description: "", assignee: "", status: "To Do" });
      onHide();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..." 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={formData.description}
              onChange={handleChange}
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Appointed Person</Form.Label>
            <Form.Control 
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              placeholder="Enter assigned person..." 
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddTaskForm;
