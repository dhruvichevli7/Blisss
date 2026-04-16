import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import AOS from 'aos';
import "aos/dist/aos.css";
import Home from './app/Home';
import Recipes from './app/Recipes';
import AboutUs from './app/AboutUs';
import ContactUs from './app/ContactUs';
import ShopUs from './app/ShopUs';
import Products from './app/Products';
import Cart from './app/CartPage';

function App() {

  useEffect(()=>{

    AOS.init({
      once:true,
    });
  });

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Recipes" element={<Recipes/>}></Route>
          <Route path="/AboutUs" element={<AboutUs/>}></Route>
          <Route path="/ContactUs" element={<ContactUs/>}></Route>
          <Route path="/ShopUs" element={<ShopUs/>}></Route>
          <Route path="/Products/:id" element={<Products/>}></Route>
          <Route path="/CartPage" element={<Cart/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App