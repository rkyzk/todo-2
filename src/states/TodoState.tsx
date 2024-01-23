import { atom } from "recoil";
import { Task } from "../types/Task";

export const todoState = atom<Task>({
  key: "todoState",
  default: {
    id: "",
    title: "",
    details: "",
    status: "notStarted",
    deadline: "",
    createdAt: "",
  },
});
