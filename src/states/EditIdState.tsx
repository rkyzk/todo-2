import { atom } from "recoil";

export const editIdState = atom<string>({
  key: "editIdState",
  default: "",
});
