import api from "@/lib/api";

export const getTasks = async () => {
  const tasks = await api.get("/tasks");
  return await tasks.data;
};

export const getTask = async (id: string) => {
  const task = await api.get(`/tasks/${id}`);
  return task.data;
};

export const createTask = async (title: string) => {
  const task = await api.post("/tasks", { title });
  return task.data;
};

export const deleteTask = async (id: string) => {
  const task = await api.delete(`/tasks/${id}`);
  return task.data;
};

export const restoreTask = async (id: string) => {
  const task = await api.patch(`/tasks/${id}`);
  return task.data;
};

export const updateTask = async (id: string, title: string) => {
  const task = await api.post(`/tasks/${id}`, { title });
  return task.data;
};

export const searchTasks = async (query: string) => {
  const tasks = await api.get(`/tasks/search?query=${query}`);
  return tasks.data;
};
