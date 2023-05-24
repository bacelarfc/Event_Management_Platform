  import { writable, derived } from 'svelte/store';

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
  
  export const totalCost = derived(
    cart,
    ($cart, set) => {
      if($cart.tickets && $cart.event.price) {
        set($cart.tickets * $cart.event.price);
      }
    },
    0
  );
  
  export function setToken(token) {
    localStorage.setItem('jwtToken', token);
  }

  export const sidePanelOpen = writable(false);

  export const step = writable(1);
  