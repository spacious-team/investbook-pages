import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';

import { configureApiClient } from '@investbook-pages/products';
import App from './app/app';

configureApiClient();

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;

if (shouldBeDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
