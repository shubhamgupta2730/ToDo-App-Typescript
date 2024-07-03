import express from "express";
import { getTodos, createTodo, updateTodo, deleteTodo, } from "../controllers/todoController.js";
const router = express.Router();
router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);
export default router;
