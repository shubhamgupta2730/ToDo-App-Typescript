import type { Request, Response } from "express";
import Todo, { TodoPriority } from "../models/todo.js";
import type {
  createTodoRequest,
  updatedTodoRequest,
} from "../interfaces/requests.js";
import _ from "lodash";

//using Set for removing duplicate documents from db;
export const duplicateTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    const seenTitles = new Set<string>();
    const duplicateIds: string[] = [];

    todos.forEach((todo) => {
      if (seenTitles.has(todo.title)) {
        duplicateIds.push(todo._id.toString());
      } else {
        seenTitles.add(todo.title);
      }
    });

    if (duplicateIds.length > 0) {
      await Todo.deleteMany({ _id: { $in: duplicateIds } });
      res.json({ message: `Removed ${duplicateIds.length} duplicate todos` });
    } else {
      res.json({ message: "No duplicates found" });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    //using lodash map:
    const todoTitles = _.map(todos, "title");
    const completedTodos = _.filter(todos, { completed: true });
    res.status(200).json({
      todos: todos,
      todoTitles: todoTitles,
      completedTodos: completedTodos,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

//GENERIC PARAMETERS OF REQUESTS:
// PARAMS, RES.BODY, REQ.BODY:
export const createTodo = async (
  req: Request<unknown, unknown, createTodoRequest>,
  res: Response
) => {
  const { title, dueDate, priority } = req.body;

  try {
    const todo = new Todo({
      title,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority: priority ? priority : TodoPriority.MEDIUM,
    });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

//PARAMS: (ID: STRING) PASSING:
export const updateTodo = async (
  req: Request<{ id: string }, unknown, updatedTodoRequest>,
  res: Response
) => {
  const { title, completed, dueDate, priority } = req.body;
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo == null) {
      return res.status(404).json({ message: "Cannot find todo" });
    }
    //nullish coalescing operator: ??
    todo.title = title ?? todo.title;
    todo.completed = completed ?? todo.completed;

    //ternary operator:
    todo.dueDate = dueDate ? new Date(dueDate) : todo.dueDate;
    todo.priority = priority ? priority : todo.priority;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo == null) {
      return res.status(404).json({ message: "Cannot find todo" });
    }

    await Todo.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted Todo" });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
