import axios from "axios";

export const postTask = (taskData) => {
  return axios.post("/api/tasks", taskData);
};

export const getTasks = () => {
  return axios.get("/api/tasks");
};

export const deleteTask = (taskId) => {
  return axios.delete(`/api/tasks/removeTask/${taskId}`);
};

export const completeTask = (taskId) => {
  return axios.put(`/api/tasks/markComplete/${taskId}`);
};
