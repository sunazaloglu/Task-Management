import { nanoid } from "nanoid";
import type { Task } from "../types/types";

const taskData = [
  {
    title: "Login page development",
    description:
      "Create a login page with username and password authentication.",
    status: "In Progress",
    assignee: "Emily Johnson",
  },
  {
    title: "API integration",
    description:
      "Fetch user data from the backend API and render it in the UI.",
    status: "In Progress",
    assignee: "Michael Smith",
  },
  {
    title: "Responsive design",
    description: "Ensure mobile compatibility for all pages and components.",
    status: "Review",
    assignee: "Sophia Martinez",
  },
  {
    title: "Database schema",
    description: "Design schema for users and tasks tables with relations.",
    status: "Done",
    assignee: "Daniel Brown",
  },
  {
    title: "Unit testing",
    description: "Write tests for task creation and deletion functions.",
    status: "Review",
    assignee: "Olivia Davis",
  },
  {
    title: "Deployment setup",
    description: "Deploy the project on Vercel or Netlify with CI/CD pipeline.",
    status: "In Progress",
    assignee: "James Wilson",
  },
  {
    title: "User profile page",
    description: "Add a profile page where users can update their information.",
    status: "To Do",
    assignee: "Ava Thompson",
  },
  {
    title: "Search functionality",
    description: "Implement search to filter tasks by title and description.",
    status: "Review",
    assignee: "William Anderson",
  },
  {
    title: "Dark mode support",
    description: "Add a theme switcher to toggle between light and dark modes.",
    status: "Done",
    assignee: "Isabella Moore",
  },
  {
    title: "Project documentation",
    description:
      "Update the README file with setup instructions and usage guide.",
    status: "To Do",
    assignee: "Benjamin Taylor",
  },
];
//since we will not be returning a new array, we can use forEach
const initialTask: Task[] = [];

taskData.forEach((task) => {
  initialTask.push({
    ...task,
    id: nanoid(),
  });
});

export default initialTask;
