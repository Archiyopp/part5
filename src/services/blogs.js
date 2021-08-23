import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};
