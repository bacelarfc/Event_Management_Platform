import { writable } from 'svelte/store';

const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : { accesToken: null, refreshToken: null };

export const user = writable(initialUser);

export const login = (accessToken, refreshToken) => {
  const newUser = { accessToken, refreshToken };
  localStorage.setItem('accessToken', accessToken);
  user.set(newUser);
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  location.replace("/login");
};