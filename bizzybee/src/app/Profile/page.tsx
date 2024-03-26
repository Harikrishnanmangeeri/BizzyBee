import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/Profile";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <UserProfile />
      <Footer />
    </div>
  );
};

export default page;
