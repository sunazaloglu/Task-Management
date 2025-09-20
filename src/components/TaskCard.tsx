import type { TaskCardProps } from "../types/types";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "react-bootstrap";

function TaskCard({ task, index, onEditTask }: TaskCardProps) {
  return (
    <div className="position-relative">
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <Card
            className="mb-3 task-card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card.Body className="xs:grid-cols-2 3xl:grid-cols-6">
              <Card.Title className="text-blue-400">{task.title}</Card.Title>
              <Card.Text className="">{task.description}</Card.Text>
              <Card.Subtitle className="text-muted text-end">Appointed: {task.assignee}</Card.Subtitle>
            </Card.Body>
          </Card>
        )}
      </Draggable>
      
      {/* Edit Button - Completely outside Draggable */}
      <button
        className="edit-btn"
        onClick={(e) => {
          e.stopPropagation();
          onEditTask(task);
        }}
        title="Edit Task"
      >
        <i className="bi bi-pencil"></i>
      </button>
    </div>
  );
}

export default TaskCard;