'use clien'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RentHistory from "@/components/RentHistory";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <RentHistory />
      <Footer />
    </div>
  );
};

export default page;
