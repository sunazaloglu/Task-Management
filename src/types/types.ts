import type React from "react";

export interface Task {
  title: string;
  description: string;
  status: string;
  assignee: string;
  id: string;
}

export interface TaskCardProps {
  task: Task;
  index: number;
  onEditTask: (task: Task) => void;
}
export interface TaskColumnProps {
  status: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

export interface TaskBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onEditTask: (task: Task) => void;
}

export interface Props {
  statuses : string[]
}