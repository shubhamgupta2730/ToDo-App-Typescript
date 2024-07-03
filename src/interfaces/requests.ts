import type { TodoPriority } from "../models/todo.js";

//validation on requests:
export interface createTodoRequest {
  title: string;
  dueDate?: Date;
  priority?: TodoPriority;
}

export interface updatedTodoRequest {
  title?: string;
  completed?: boolean;
  dueDate?: Date;
  priority?: TodoPriority;
}
