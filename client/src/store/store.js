import { writable } from 'svelte/store';

export const isAuthenticated = writable(!!localStorage.getItem('token'));

export function login() {
  isAuthenticated.set(true);
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
