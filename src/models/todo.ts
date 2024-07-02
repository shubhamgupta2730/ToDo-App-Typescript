import { Schema, model } from "mongoose";

export enum TodoPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
export interface ITodo extends Document {
  title: string;
  completed: boolean;
  dueDate?: Date;
  priority: TodoPriority;
}

const todoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  priority: {
    type: String,
    enum: TodoPriority,
    default: TodoPriority.MEDIUM,
  },
});

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
