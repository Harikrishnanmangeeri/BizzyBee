import AllProducts from "@/components/Allproducts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Landing } from "@/components/landing";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Landing/>
      <AllProducts/>
      <Footer/>
    </div>
  );
};

export default page;
