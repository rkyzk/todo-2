import { atom, selector } from "recoil";
import { Task } from "../types/Task";
import { db } from "../FirebaseConfig";
import { DataSnapshot, ref, get } from "firebase/database";

/** FirebaseよりTodoを取得 */
export const fetchData = async () => {
  const dbRef = ref(db, "tasks/");
  let snapshot: DataSnapshot | undefined;
  try {
    snapshot = await get(dbRef);
  } catch (error) {
    alert("Error! The list couldn't be retrieved.");
  }
  if (snapshot?.exists()) {
    const arr: Task[] = Object.values(snapshot.val());
    return arr;
  } else {
    const arr: Task[] = [];
    return arr;
  }
};

export const todoListState = atom<Array<Task>>({
  key: "todoListState",
  default: [],
});

export const todoListStateLength = selector<number>({
  key: "todosCount",
  get: ({ get }) => {
    const count: Array<Task> = get(todoListState);
    return count?.length || 0;
  },
});
