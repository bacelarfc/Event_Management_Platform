  import { writable, derived } from 'svelte/store';

  export const cart = writable({
    event: {},
    tickets: 0,
    showPaymentPanel: false,
    customer: {
      firstName: '',
      lastName: '',
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
  export const resetCart = () => cart.set({
    event: {},
    tickets: 0,
    showPaymentPanel: false,
    customer: {
      firstName: '',
      lastName: '',
      email: '',
    },
    totalCost: 0, 
  });
  
  export const sidePanelOpen = writable(false);

  export const step = writable(1);
  