import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
// Import your routes here
import App from './App';
import vacationRequestRoutes from './routes/vacation_request';
import loginRoute from './routes/login';
import registerRoute from './routes/register';

const NotFound = () => (
    <h1>Not Found</h1>
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                {/* Add your routes here */}
                { loginRoute }
                { registerRoute}
                { vacationRequestRoutes }
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Router>
    </React.StrictMode>
);

/*
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/
