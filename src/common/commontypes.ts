export type Task = {
  id: string;
  title: string;
  isDone: boolean;
}

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
}

export type TasksStateType = {
  [todolistId: string]: Task[]
}