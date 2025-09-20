import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import type { Task, TaskBoardProps } from "../types/types";
import { Container, Row, Col } from "react-bootstrap";
import TaskColumn from "./TaskColumn";
import DeleteArea from "./DeleteArea";

function TaskBoard({ tasks, setTasks, onEditTask }: TaskBoardProps) {
  const onDragEnd = (result: DropResult) => {
    console.log("Drage Result:", result);
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // Handle deletion if dropped in delete area
    if (destination.droppableId === "delete-area") {
      setTasks(tasks.filter((task) => task.id !== draggableId));
      return;
    }

    //If it's somewhere it can be left, this is a return.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //helps us find the drifting task
    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (!draggedTask) {
      console.error(`Task not found: ${draggableId}`);
      return;
    }

    // updates the status according to the target column
    const updatedTask: Task = {
      ...draggedTask,
      status: destination.droppableId as Task["status"],
    };

    // We remove our old sample from that column
    const newTasks = tasks.filter((task) => task.id !== draggableId);



    // Create a new array with the updated task inserted at the correct position
    const updatedTasks = [...newTasks];
    
    // Find the correct position to insert the task
    if (destination.index === 0) {
      // Insert at the beginning of the destination column
      const firstTaskInDestination = updatedTasks.find(
        (task) => task.status === destination.droppableId
      );
      if (firstTaskInDestination) {
        const insertIndex = updatedTasks.indexOf(firstTaskInDestination);
        updatedTasks.splice(insertIndex, 0, updatedTask);
      } else {
        // If destination column is empty, add to the end
        updatedTasks.push(updatedTask);
      }
    } else {
      // Insert at the specified index within the destination column
      const destinationTasksInOrder = updatedTasks.filter(
        (task) => task.status === destination.droppableId
      );
      
      if (destination.index <= destinationTasksInOrder.length) {
        const targetTask = destinationTasksInOrder[destination.index - 1];
        const insertIndex = updatedTasks.indexOf(targetTask) + 1;
        updatedTasks.splice(insertIndex, 0, updatedTask);
      } else {
        // If index is beyond the column length, add to the end
        updatedTasks.push(updatedTask);
      }
    }

    //update state
    setTasks(updatedTasks);
  };

  const statuses: Task["status"][] = ["To Do", "In Progress", "Review", "Done"];
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container fluid>
        <Row>
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((tasks) => tasks.status === status)}
              onEditTask={onEditTask}
            />
          ))}
        </Row>
        <Row className="mt-4">
          <Col>
            <DeleteArea />
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  );
}

export default TaskBoard;
