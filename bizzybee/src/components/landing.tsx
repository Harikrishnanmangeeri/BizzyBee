'use client'
import React, { useEffect } from "react";
import { SparklesCore } from "./ui/sparkles";
import axios from "axios";

export function Landing() {

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        const data = response.data;
        // console.log(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
 
  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Welcome to bizzyBee.
      </h1>
    </div>
  );
}
