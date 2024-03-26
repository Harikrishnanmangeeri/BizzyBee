import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AddRent from "@/components/Rent";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <AddRent />
      <Footer />
    </div>
  );
};

export default page;
