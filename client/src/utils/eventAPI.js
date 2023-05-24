const API_BASE_URL = 'http://localhost:8080';

async function request(method, url, data) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const token = localStorage.getItem('token');

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const requestOptions = {
    method: method,
    headers: headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(API_BASE_URL + url, requestOptions);

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw errorData;
  }
}

export async function getEvents() {
  try {
    const response = await request('GET', '/events');
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getEventById(eventId) {
  try {
    const response = await request('GET', `/events/${eventId}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createEvent(event) {
  try {
    const response = await request('POST', '/createEvent', event);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateEvent(eventId, event) {
  try {
    const response = await request('PUT', `/events/${eventId}`, event);
    return response;
  } catch (error) {
    throw error;
  }
}


export async function deleteEvent(eventId) {
  try {
    await request('DELETE', `/events/${eventId}`);
  } catch (error) {
    throw error;
  }
}

