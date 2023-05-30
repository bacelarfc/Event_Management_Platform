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

export async function fetchAllOrders() {
  try {
    const response = await request('GET', '/orders');
    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchOrdersByEmail(email) {
    try {
      const response = await request('GET', `/orders/email/${email}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
  
