import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  duplicateTodos,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);
router.delete("/removeDuplicate", duplicateTodos);

export default router;
