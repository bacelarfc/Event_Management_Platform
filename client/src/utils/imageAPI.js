const API_BASE_URL = 'http://localhost:8080';

async function request(method, url, data) {
  const headers = new Headers();
  const token = localStorage.getItem('token');

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const requestOptions = {
    method: method,
    headers: headers,
    body: data,
  };

  const response = await fetch(API_BASE_URL + url, requestOptions);

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw errorData;
  }
}

export async function uploadImage(formData) {
  try {
    const response = await request('POST', '/image/upload', formData);
    return response;
  } catch (error) {
    throw error;
  }
}
