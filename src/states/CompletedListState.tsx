import { atom, selector } from "recoil";
import { Task } from "../types/Task";

export const completedListState = atom<Array<Task>>({
  key: "completedList",
  default: [],
});

export const completedTodosCount = selector<number>({
  key: "compTodosCount",
  get: ({ get }) => {
    const compTodosCount: Array<Task> = get(completedListState);
    return compTodosCount?.length || 0;
  },
});
