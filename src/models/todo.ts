import { Schema, model } from "mongoose";

interface ITodo {
  title: string;
  completed: boolean;
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
});

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
