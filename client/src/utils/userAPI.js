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

export async function getUsers() {
    try {
      const response = await request('GET', '/users');
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function getUserByEmail(email) {
    try {
      const response = await request('GET', `/users/${email}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

export async function createUser(user) {
  try {
    const response = await request('POST', '/users', user);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(email, user) {
  try {
    const response = await request('PUT', `/users/${email}`, user);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUserAdminStatus(email) {
  try {
    const response = await request('PATCH', '/users/' + email + '/admin');
    return response;
  } catch (error) {
    throw error;
  }
}


export async function deleteUser(email) {
  try {
    const response = await request('DELETE', '/users/' + email, { email });
    return response;
  } catch (error) {
    throw error;
  }
}
