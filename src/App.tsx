import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import CommandesPage from "./pages/CommandesPage";
import ProduitsPage from "./pages/ProduitsPage";
import AdminProduit from "./pages/AdminProduit"

import PanierPages from "./pages/PanierPages";


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
        path:'/AdminProduit',
        element: <AdminProduit/>

    },
    {
        path:'/CommandePage',
        element: <CommandesPage/>
    },
    {
        path: '/panier',
        element: <PanierPages/>

    }
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
