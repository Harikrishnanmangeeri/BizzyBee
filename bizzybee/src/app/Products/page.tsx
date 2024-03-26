import AllProducts from "@/components/Allproducts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <AllProducts />
      <Footer/>
    </div>
  );
};

export default page;
