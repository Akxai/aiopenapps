import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Submit from "./pages/Submit";
import User from "./components/User";
import Tool from "./pages/Tool";
import Sponsor from "./pages/Sponsor";
import Contact from "./pages/Contact";

function App() {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setContentLoaded(true);
    }, 600);
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <div style={{ minHeight: "calc(100vh - 120px)" }}>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/user" element={<User />} />
          <Route path="/submit/tool" element={<Tool />} />
          <Route path="/submit/sponsor" element={<Sponsor />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {contentLoaded && <Footer />}
    </BrowserRouter>
  );
}

export default App;
