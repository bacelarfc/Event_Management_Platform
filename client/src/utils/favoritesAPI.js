localStorage.setItem('userId', userId);

function getFormattedToken() {
  const storedToken = localStorage.getItem("token");
  console.log('storedToken:', storedToken);  // Add this line
  
  if (storedToken) {
    if (storedToken.startsWith('Bearer ')) {
      // Remove the 'Bearer ' prefix from the token
      return storedToken.replace(/^Bearer\s+/, '');
    } else {
      return storedToken;
    }
  }
  return null;
}



export async function getFavoriteEvents(userId) {
  const token = getFormattedToken();
  

  const response = await fetch(`http://localhost:8080/api/user/${userId}/favorites`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.events;
  } else {
    throw new Error('Error fetching favorite events');
  }
}

export async function deleteFavoriteEvent(eventId) {
  const token = getFormattedToken();

  const response = await fetch(`http://localhost:8080/api/user/favorite/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token,
    },
  });

  if (!response.ok) {
    throw new Error('Error deleting favorite event');
  }
}
