import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './index.css';
import App from './App';
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchContextProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<App/>}/>
          </Routes>
        </Router>
      </AuthContextProvider>
    </SearchContextProvider>
  </React.StrictMode>
);


