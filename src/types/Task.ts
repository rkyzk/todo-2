type Status = "notStarted" | "inProgress" | "done";

export type Task = {
  id: string;
  title: string;
  details: string;
  status: Status;
  deadline: string;
  createdAt: string;
};
