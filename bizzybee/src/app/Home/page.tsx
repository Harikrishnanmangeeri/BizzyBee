import AllProducts from "@/components/Allproducts";
import Navbar from "@/components/Navbar";
import { Landing } from "@/components/landing";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Landing/>
      <AllProducts/>
    </div>
  );
};

export default page;
