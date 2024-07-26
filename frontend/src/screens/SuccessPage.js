import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <section className="flex items-center justify-center text-center w-full h-screen">
      {/* <div className="md:flex flex-1 items-center justify-center md:w-7/12 bg-primary-green hidden">
        <p className="justify-center">
          <img src="../images/logo-white.png" className="w-28 h-28 " />
        </p>
      </div> */}
      <div className="w-11/12 md:w-1/2 mx-auto bg-main-btn-color p-5 rounded">
        <h2 className="font-bold text-slate-50 text-3xl my-10">
          Payment Successful
        </h2>
        <p className=" text-slate-50">
          We have sent a receipt of your purchase to your email
        </p>
        <Link to="/" className="block w-full md:w-1/2 mx-auto rounded p-3 my-10 bg-primary-orange text-white text-center">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default SuccessPage;
