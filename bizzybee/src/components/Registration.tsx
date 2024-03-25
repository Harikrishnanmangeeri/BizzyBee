
'use client'
import axiosInstance from "@/axios/axios";
import React from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Registration: React.FC = () => {
  const router = useRouter();


  const handleRegistration = async (event:any) => {
    event.preventDefault();
 const email = event.target.email.value;
 const contact = event.target.contact.value;
 const username = event.target.username.value;
 const password = event.target.password.value;




    try {
      const response = await axiosInstance.post("user/registration", {
        username,
        email,
        password,
        contact,
      });

      if (response.data === "This registration add to database sucessfully") {
        toast.success("Registration successful!");
        router.push("/");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <ToastContainer />
      <div className="container h-full p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="hidden  h-full md:block bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-b-lg lg:w-full lg:rounded-r-lg lg:rounded-bl-none">
            <div className="px-8 py-12">
              <h4 className="mb-6 text-xl font-semibold">
                We are more than just a company
              </h4>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

         
          <div>
            <div className="text-center mb-8">
              <img
                className="mx-auto w-48"
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo"
              />
              <h4 className="mt-4 text-xl font-semibold">
                Create an Account
              </h4>
            </div>

            <form className="max-w-sm mx-auto" onSubmit={handleRegistration}>
 
              <div className="mb-4">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="w-full px-4 py-2 rounded border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring focus:border-primary-400"
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring focus:border-primary-400"
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring focus:border-primary-400"
                />
              </div>

             
              <div className="mb-4">
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Contact"
                  className="w-full px-4 py-2 rounded border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring focus:border-primary-400"
                />
              </div>

              <div className="mb-6 text-center">
                <button
                  className="w-full py-2 rounded-md text-white font-semibold uppercase bg-gradient-to-r from-orange-500 to-pink-500 shadow-md transition duration-300 ease-in-out hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-opacity-50"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
