import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layoute from './components/Layout';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import BasketPage from './pages/BasketPage';

function App() {
  return (
    <Routes>
      <Route element={<Layoute/>}>
        <Route path='/' element={<HomePage/>} />
        <Route path='/item' element={<ItemPage/>} />
        <Route path='/basket' element={<BasketPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
