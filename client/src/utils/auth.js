const API_BASE_URL = 'http://localhost:8080'

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

export async function signUp(email, password, firstName, lastName) {
  try {
    const response = await request('POST', '/api/auth/signUp', { email, password, firstName, lastName });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  try {
    const response = await request('POST', '/api/auth/login', { email, password });
    return response;
  } catch (error) {
    throw error;
  }
}

export function getToken() {
  const token = localStorage.getItem('token');
  return token ? token.replace('Bearer ', '') : null;
}

export function removeToken() {
  localStorage.removeItem('token');
}


  export async function getUserFromToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }
  
  
      const response = await fetch(`${API_BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      throw error;
    }
  }