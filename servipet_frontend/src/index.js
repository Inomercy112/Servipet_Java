import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

import ApolloProviderComponent from './apollo/ApolloProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProviderComponent>    
    <AuthProvider>
      <App />
    </AuthProvider>
    </ApolloProviderComponent>
  </React.StrictMode>
);

reportWebVitals();
