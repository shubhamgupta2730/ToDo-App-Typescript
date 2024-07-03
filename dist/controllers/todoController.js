var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Todo, { TodoPriority } from "../models/todo.js";
import _ from "lodash";
//using Set for removing duplicate documents from db;
export const duplicateTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.find();
        const seenTitles = new Set();
        const duplicateIds = [];
        todos.forEach((todo) => {
            if (seenTitles.has(todo.title)) {
                duplicateIds.push(todo._id.toString());
            }
            else {
                seenTitles.add(todo.title);
            }
        });
        if (duplicateIds.length > 0) {
            yield Todo.deleteMany({ _id: { $in: duplicateIds } });
            res.json({ message: `Removed ${duplicateIds.length} duplicate todos` });
        }
        else {
            res.json({ message: "No duplicates found" });
        }
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
export const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.find();
        //using lodash map:
        const todoTitles = _.map(todos, "title");
        const completedTodos = _.filter(todos, { completed: true });
        res.status(200).json({
            todos: todos,
            todoTitles: todoTitles,
            completedTodos: completedTodos,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
//GENERIC PARAMETERS OF REQUESTS:
// PARAMS, RES.BODY, REQ.BODY:
export const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, dueDate, priority } = req.body;
    try {
        const todo = new Todo({
            title,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            priority: priority ? priority : TodoPriority.MEDIUM,
        });
        const newTodo = yield todo.save();
        res.status(201).json(newTodo);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
//PARAMS: (ID: STRING) PASSING:
export const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, completed, dueDate, priority } = req.body;
    try {
        const todo = yield Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: "Cannot find todo" });
        }
        //nullish coalescing operator: ??
        todo.title = title !== null && title !== void 0 ? title : todo.title;
        todo.completed = completed !== null && completed !== void 0 ? completed : todo.completed;
        //ternary operator:
        todo.dueDate = dueDate ? new Date(dueDate) : todo.dueDate;
        todo.priority = priority ? priority : todo.priority;
        const updatedTodo = yield todo.save();
        res.json(updatedTodo);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
});
export const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: "Cannot find todo" });
        }
        yield Todo.deleteOne({ _id: req.params.id });
        res.json({ message: "Deleted Todo" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
