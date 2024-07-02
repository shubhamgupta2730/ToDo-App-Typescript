import { Request, Response } from "express";
import Todo from "../models/todo";

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
  const todo = new Todo({
    title: req.body.title,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo == null) {
      return res.status(404).json({ message: "Cannot find todo" });
    }

    if (req.body.title != null) {
      todo.title = req.body.title;
    }

    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }

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
