// src/components/Layout.js
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This is where the page content will be rendered */}
      <Footer />
    </div>
  );
};

export default Layout;
