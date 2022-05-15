import axios from "./api/axios";

const endpoint = {
  LOGIN: '/users/login',
  GETUSER: '/users/',
  EDITUSER: '/users/edit',
  GETALLUSERS: '/users/all',
}

export const getAuth = async ( login, password ) => {
  return await axios.post(endpoint.LOGIN, JSON.stringify({ login, password }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export const getUser = async ( id ) => {
  const response = await axios.get(`${endpoint.GETUSER}${id}`, JSON.stringify(id), {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
}

export const editUser = async ( userInfo ) => {
  return await axios.put(endpoint.EDITUSER, JSON.stringify({ ...userInfo }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export const getAllUsers = async () => {
  const response = await axios.get(endpoint.GETALLUSERS, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
}