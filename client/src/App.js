import React, {useEffect, useMemo, useState } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth.js";
import Home from "./pages/Home.js";
import Verify from "./pages/Verify.js";
import Cart from "./pages/Cart.js";
import QRCodeScanner from "./pages/QRCodeScanner.js";
import Order from "./pages/Order.js";
import Payment from "./pages/Payment.js";
import MyOrders from "./pages/MyOrders.js";
import DetailsList from "./components/DetailsList.js";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import Error from "./components/Error.js";
import { isLoggedIn } from "./api/authApi.js";

export default function App() {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const res = await isLoggedIn();
      if(res.data.auth) {
        setIsUser(true);
      }
    }
    checkUser()
  }, [isUser]);
  return (
    <>
      <Routes>
      <Route path="*" element={<Error />} />
        <Route path = '/' element = {<Auth/>}>
        </Route>
        <Route path="/verify" element={<Verify />} />
        <Route path="/error" element={<Error />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qrcode"
          element={
            <ProtectedRoute>
              <QRCodeScanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myorders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/:id"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
              <DetailsList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
