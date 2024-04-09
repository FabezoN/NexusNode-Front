import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
    {
        path: '/register',
        element: <Register/>
    }
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
