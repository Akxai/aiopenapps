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
import Blog from "./pages/Blog";
import BlogPage from "./pages/BlogPage";
import Bookmark from "./pages/Bookmark";

import { AuthProvider } from "./components/AuthContext";

function App() {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setContentLoaded(true);
    }, 600);
  }, []);
  return (
    <AuthProvider>
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
            <Route path="/submit/bookmark" element={<Bookmark />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
          </Routes>
        </div>
        {contentLoaded && <Footer />}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
