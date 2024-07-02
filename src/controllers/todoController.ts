import { Request, Response } from "express";
import Todo, { ITodo, TodoPriority } from '../models/todo';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, dueDate, priority } = req.body;

  try {
    const todo = new Todo({
      title,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority: priority? priority: TodoPriority.MEDIUM
    });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
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
    todo.priority = priority? priority: todo.priority
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
