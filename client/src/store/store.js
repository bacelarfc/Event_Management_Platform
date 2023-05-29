import { writable } from 'svelte/store';
import { getUserFromToken } from '../utils/auth';

export const isAuthenticated = writable(!!localStorage.getItem('token'));
export const isAdmin = writable(false);


async function checkAdmin() {
  const data = await getUserFromToken();
  if (data.user.isAdmin) {
    console.log("true")
    isAdmin.set(true);
  } else {
    console.log("false");
    isAdmin.set(false);
  }
}

export function login() {
  isAuthenticated.set(true);
  checkAdmin();
}

export function logout() {
  isAuthenticated.set(false);
}

export const cart = writable({
    event: {},
    tickets: 0,
    showPaymentPanel: false,
    customer: {
      name: '',
      surname: '',
      email: '',
    },
    totalCost: 0,
  });

export const user = writable(null);
