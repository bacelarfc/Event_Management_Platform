import { writable } from 'svelte/store';

let defaultTheme = 'dark';
const savedTheme = localStorage.getItem('theme');
if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
  defaultTheme = savedTheme;
}

export const theme = writable(defaultTheme);

theme.subscribe((value) => {
  localStorage.setItem('theme', value);
});


