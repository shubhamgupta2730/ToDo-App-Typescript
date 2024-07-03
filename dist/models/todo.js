import { Schema, model } from "mongoose";
export var TodoPriority;
(function (TodoPriority) {
    TodoPriority["LOW"] = "LOW";
    TodoPriority["MEDIUM"] = "MEDIUM";
    TodoPriority["HIGH"] = "HIGH";
})(TodoPriority || (TodoPriority = {}));
const todoSchema = new Schema({
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
const Todo = model("Todo", todoSchema);
export default Todo;
