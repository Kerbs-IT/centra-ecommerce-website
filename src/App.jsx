
import { useContext, useState } from 'react';
import './App.css'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import { AuthProvider } from './AuthContext';
import ProductDetails from './components/ProductDetails';


function App() {
 

  return (
    <div className="app bg-gray-100 min-h-dvh flex flex-col">
      <AuthProvider>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sign-in" element={<Auth mode="signin" />} />
            <Route path="/sign-up" element={<Auth mode="signup" />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </AuthProvider>
    </div>
  );
}

export default App
