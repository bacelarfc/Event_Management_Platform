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

export async function updateEvent(eventId, updatedData) {
  try {
    const response = await request('PUT', `/events/${eventId}`, updatedData);
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

export async function updateTicketLeft(eventId, ticketLeft) {
  try {
    const updatedData = { ticket_left: ticketLeft };
    await updateEvent(eventId, updatedData);
  } catch (error) {
    throw error;
  }
}

export async function fetchOrdersByEmail(email) {
  try {
    const response = await request('GET', `/orders/email/${email}`);
    const orders = response.orders;

    const eventIds = orders.map((order) => order.eventId);
    const events = await Promise.all(eventIds.map((eventId) => getEventById(eventId)));

    const ordersWithEventNames = orders.map((order) => {
      const event = events.find((event) => event._id === order.eventId);
      return { ...order, eventName: event.name };
    });

    return ordersWithEventNames;
  } catch (error) {
    throw error;
  }
}
