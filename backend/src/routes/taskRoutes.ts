import express from "express";
import Task from "../models/Task";

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", async (req, res) => {
  const tasks = await Task.find({ deletedAt: null })
    .select({ title: 1 })
    .sort({ createdAt: -1 });
console.log("tasks", tasks)
  res.json(tasks);
});

/**
 * @swagger
 * /api/tasks/search:
 *   get:
 *     summary: Search tasks
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of tasks matching the search query
 */
router.get("/search", async (req, res) => {
  const { query = null } = req.query;
  if (!query) throw new Error("Query is required!");
  const tasks = await Task.find({
    title: { $regex: query, $options: "i" },
    deletedAt: null,
  })
    .select({ title: 1 })
    .sort({ createdAt: -1 });
  res.json(tasks);
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to retrieve
 *     responses:
 *       200:
 *         description: Task details
 */
router.get("/:id", async (req, res) => {
  const { id = null } = req.params;
  if (!id) throw new Error("ID is required!");

  const tasks = await Task.findById({ _id: id }).select({ title: 1 });
  if (!tasks) throw new Error("Task not found!");

  res.json(tasks);
});

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", async (req, res) => {
  const { title = null } = req.body || {};
  if (!title) throw new Error("Title is required!");

  const newTask = new Task({ title });
  await newTask.save();
  res.status(201).json(newTask);
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to delete
 *     responses:
 *       204:
 *         description: Task deleted
 */
router.delete("/:id", async (req, res) => {
  const { id = null } = req.params;
  if (!id) throw new Error("ID is required!");

  await Task.findByIdAndUpdate({ _id: id }, { deletedAt: new Date() });

  res.status(200).json(id);
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Restore a task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to restore
 *     responses:
 *       204:
 *         description: Task restored
 */
router.patch("/:id", async (req, res) => {
  const { id = null } = req.params;
  if (!id) throw new Error("ID is required!");

  await Task.findByIdAndUpdate({ _id: id }, { deletedAt: null });
  res.status(204).end();
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   post:
 *     summary: Update a task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 */
router.post("/:id", async (req, res) => {
  const { id = null } = req.params;
  const { title = null } = req.body || {};
  if (!id) throw new Error("ID is required!");
  if (!title) throw new Error("Title is required!");
  const task = await Task.findByIdAndUpdate(
    { _id: id },
    { title },
    { new: true }
  ).select({ title: 1 });
  if (!task) throw new Error("Task not found!");
  res.json(task);
});

export default router;
