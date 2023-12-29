import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';
import Main from './pages/Main/Main';
import Nav from './components/Nav/Nav';
import Product from './pages/Product/Product';
import Details from './pages/Details/Details';
import Footer from './components/Footer/Footer';
import Basket from './pages/Basket/Basket';
import FindId from './pages/FindUser/FindId/FindId';
import FindPw from './pages/FindUser/FindPw/FindPw';
import JoinDone from './pages/JoinDone/JoinDone';
import Payment from './pages/Payment/Payment';
import Search from './pages/Search/Search';
import ScrollToTop from './components/ScrollTop/ScrollTop';

const Router = () => {
  return (
    <BrowserRouter basename="/widely">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:productId" element={<Details />} />
        <Route path="/search" element={<Search />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/find_id" element={<FindId />} />
        <Route path="/fInd_pw" element={<FindPw />} />
        <Route path="/done" element={<JoinDone />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
