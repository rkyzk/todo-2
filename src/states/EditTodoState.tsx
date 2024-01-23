import { atom } from "recoil";
import { Task } from "../types/Task";

export const editTodoState = atom<Task>({
  key: "editTodoState",
  default: {
    id: "",
    title: "",
    details: "",
    status: "notStarted",
    deadline: "",
    createdAt: "",
  },
});
