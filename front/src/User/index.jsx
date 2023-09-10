import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigatioBar from './Components/Navigatiobar';
import CategorySec from '../User/Pages/CategorySec';
import Home from '../User/Pages/Home';
import Products from './Pages/Products';
import ProductPages from './Pages/ProductPages'
import CategoryProduct from './Pages/CategoryProduct';// Make sure to import the correct path for CategoryProduct

import FooterSection from '../Components/FooterSection';
import UserProfile from './Pages/UserProfile';
import { Navigate } from 'react-router-dom'

function Index() {
  return (
    <>
      <NavigatioBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategorySec />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:_id" element={<ProductPages />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/products/category/:CategoryName" element={<CategoryProduct />} />
        <Route path="*" element={<Navigate to="/userprofile" replace={true}/>} />
      </Routes>
      <FooterSection/>
    </>
  );
}

export default Index;
