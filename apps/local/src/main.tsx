import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';

import { configureApiClient } from '@investbook-pages/products';
import App from './app/app';

configureApiClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
