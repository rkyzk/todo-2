import { atom } from "recoil";

type Filter = "all" | "notStarted" | "inProgress";

export const filterState = atom<Filter>({
  key: "filterState",
  default: "all",
});
