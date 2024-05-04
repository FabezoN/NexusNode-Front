import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import CommandesPage from "./pages/CommandesPage";
import ProduitsPage from "./pages/ProduitsPage";
import AdminProduit from "./pages/AdminProduit";
import ERROR from "./pages/ERROR";
import Statistique from "./pages/Statistique";


import PanierPages from "./pages/PanierPages";

let URL = process.env
//console.log(URL);

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

    },
    {
        path:'/error404',
        element: <ERROR/>
    },
    {
        path:'/statistique',
        element: <Statistique/>
    },

])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
