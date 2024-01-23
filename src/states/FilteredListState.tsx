import { atom, selector } from "recoil";
import { Task } from "../types/Task";

export const filteredListState = atom<Array<Task>>({
  key: "filteredListState",
  default: [],
});

export const filteredListStateLength = selector<number>({
  key: "filteredTodosCount",
  get: ({ get }) => {
    const filteredTodosCount: Array<Task> = get(filteredListState);
    return filteredTodosCount?.length || 0;
  },
});
