import { Droppable } from "@hello-pangea/dnd";
import { Card } from "react-bootstrap";

function DeleteArea() {
  return (
    <Droppable droppableId="delete-area">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`delete-area p-4 text-center ${
            snapshot.isDraggingOver ? "bg-danger bg-opacity-25" : ""
          }`}
          style={{
            minHeight: "100px",
            border: "2px dashed #dc3545",
            borderRadius: "8px",
            transition: "all 0.2s ease",
          }}
        >
          <Card className="border-0 bg-transparent">
            <Card.Body>
              <i className="bi bi-trash3 text-danger" style={{ fontSize: "2rem" }}></i>
              <Card.Text className="text-muted mt-2">
                {snapshot.isDraggingOver 
                  ? "Drop here to delete task" 
                  : "Drag tasks here to delete"
                }
              </Card.Text>
            </Card.Body>
          </Card>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DeleteArea;
