import axios from "./api/axios";

const endpoint = {
  LOGIN: '/users/login',
  GETUSER: '/users/',
  EDITUSER: '/users/edit',
  GETALLUSERS: '/users/all',
  GETTASKS: '/tasks',
  GETCOMMENTS: '/comments/',
  SENDCOMMENT: '/comments/createOrEdit',
  SENDTASK: '/tasks/createOrEdit',
  EDITSTATUS: '/status/',
}

const headers = { headers: { 'Content-Type': 'application/json' } };


export const getAuth = async ( login, password ) => {
  return await axios.post(endpoint.LOGIN, JSON.stringify({ login, password }), headers);
}


export const getUser = async ( id ) => {
  const response = await axios.get(`${endpoint.GETUSER}${id}`, JSON.stringify(id), headers);
  return response.data;
}


export const editUser = async ( userInfo ) => {
  return await axios.put(endpoint.EDITUSER, JSON.stringify({ ...userInfo }), headers);
}


export const getAllUsers = async () => {
  const response = await axios.get(endpoint.GETALLUSERS, headers);
  return response.data;
}


export const getTasks = async (filter, page, limit) => {
  const params = {
    query: "",
    assignedUsers: [],
    userIds: [],
    type: [],
    status: [],
    rank: []
  };

  const body = {
    filter: filter || params,
    page: page || 0,
    limit: limit || 10
  }
  const response = await axios.post(endpoint.GETTASKS, JSON.stringify(body), headers);

  return response.data;
}

export const getTask = async (taskId) => {
  const response = await axios.get(`${endpoint.GETTASKS}/${taskId}`, null, headers);
  return response.data;
}


export const getComments = async (taskId) => {
  const response = await axios.get(`${endpoint.GETCOMMENTS}${taskId}`, headers);
  return response.data;
}


export const sendComment = async ({id, taskId, userId, text, dateOfCreation, dateOfUpdate}) => {
  let body = {
    taskId,
    userId,
    text,
    dateOfCreation,
    dateOfUpdate,
  }

  if (id) body = { id, ...body};
  
  const response = await axios.put(endpoint.SENDCOMMENT, JSON.stringify(body), headers);

  return response.data;
}


export const deleteComment = async (commentId) => {

  const response = await axios.delete(`${endpoint.GETCOMMENTS}${commentId}`, headers);
  return response.data;
}


export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${endpoint.GETTASKS}/${taskId}`, headers);

  return response.data;
}


export const sendTask = async (taskInfo) => {
  
  const body = {
    userId: taskInfo.userId || 'Anna',
    assignedId: taskInfo.assignedId || '',
    title: taskInfo.title || 'New task',
    description: taskInfo.description || 'description',
    type: taskInfo.type || 'task',
    timeInMinutes: taskInfo.timeInMinutes || 0,
    status: taskInfo.status || "opened",
    rank: taskInfo.rank || "low",
  }
  
  if (taskInfo.id) body.id = taskInfo.id;

  const response = await axios.put(endpoint.SENDTASK, JSON.stringify(body), headers);

  return response.data;
}


export const changeStatus = async (taskId, newStatus) => {
  const response = await axios.patch(`${endpoint.GETTASKS}/${taskId}${endpoint.EDITSTATUS}${newStatus}`);
  return response.data;
}