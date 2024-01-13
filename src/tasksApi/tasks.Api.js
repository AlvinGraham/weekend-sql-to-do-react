import axios from 'axios';

export const postTask = (taskData) => {
  return axios.post('/api/tasks', taskData);
};

export const getTasks = () => {
  return axios.get('/api/tasks');
};