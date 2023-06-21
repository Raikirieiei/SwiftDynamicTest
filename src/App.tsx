import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ShapePage from './pages/ShapePage';
import FormPage from './pages/FormPage';
import Header from './components/Header'

import './App.css';

function App() {
  return (
    <div style={{background: 'linear-gradient(to right, #6eda78 , #ffa200)', height: '100vh', overflow: 'auto'}}>
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/shape' element={<ShapePage/>} />
            <Route path='/form' element={<FormPage/>} />
        </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
