const url = 'https://fe-school-api.herokuapp.com/api/events';

const sendRequest = async (url, method = 'GET', body) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': 'application/json',
    })
  });

  return response.json();
};

export const getEvents = () => {
  return sendRequest(url);
};

export const getEvent = (id) => {
  return sendRequest(`${url}/${id}`);
};

export const addEvent = (data) => {
  const eventData = {
    ...data,
    favorite: false,
    archive: false,
  }
  return sendRequest(`${url}`, 'POST', eventData);
};

export const editEvent = (data) => {
  return sendRequest(`${url}`, 'PUT', data);
}

export const deleteEvent = (id) => {
  return sendRequest(`${url}/${id}`, 'DELETE');
};

// export const deleteAllArchiveEvents = () => {
//   return sendRequest(`${url}/archive/delete`, 'DELETE');
// };

export const deleteAllArchiveEvents = (ids) => {
  return ids.map(id => deleteEvent(id));
};
