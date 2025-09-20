import type { TaskColumnProps } from "../types/types";
import { Col } from "react-bootstrap";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function TaskColumn({ tasks, status, onEditTask }: TaskColumnProps) {
  return (
    <Col>
      <h4 className="text-center">{status}</h4>
      <Droppable droppableId={status}>
        {(provided , snapshot) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            className={`column-drop-area ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {tasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index} 
                onEditTask={onEditTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
}
export default TaskColumn;
