import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import Commandes from "./pages/commandes";
import ProduitsPage from "./pages/ProduitsPage";
import AdminProduit from "./pages/AdminProduit"

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path : '/adminpage',
        element : <AdminPage/>
    },
    {
        path: '/categorieproduit/:id',
        element: <ProduitsPage/>
    },
    {
        path: '/commandes',
        element: <Commandes/>
    },
    {
        path:'/AdminProduit',
        element: <AdminProduit/>

    }
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
