import { useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/login'
import Dashboard from './components/Dashboard'
import { Routes, Route, BrowserRouter,Navigate } from 'react-router-dom'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'
import EmailVerified from './components/EmailVerified'
import Category from './components/Category'
import Subcategory from './components/Subcategory'
import Product from './components/Product'
import Orders from './components/Orders'
import AddCategory from './components/AddCategory'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/register" element={<Register/>}></Route>
          <Route path="/auth/login" element={<Login/>}></Route>
          <Route path="/auth/dashboard" element={<Dashboard/>}></Route>
          <Route path="/auth/forgetpassword" element={<ForgetPassword/>}></Route>
          <Route path="/auth/reset-password" element={<ResetPassword/>}></Route>
          <Route path="/auth/verify" element={<EmailVerified/>}></Route>
          <Route path="/categories/" element={<Category/>}></Route>
          <Route path="/subcategories/allsubcategory" element={<Subcategory/>}></Route>
          <Route path="/product/" element={<Product/>}></Route>
          <Route path="/orders/userOrders" element={<Orders/>}></Route>
          <Route path="/categories/createCategory" element={<AddCategory/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
