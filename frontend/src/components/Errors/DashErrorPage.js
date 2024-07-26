import React from "react";
import { Link } from "react-router-dom";

const DashErrorPage = () => {
  return (
    <section className="flex h-screen text-text-color">
      <div className="flex flex-1 justify-center text-center items-center">
        <div>
          <h6 className="text-lg my-4 font-bold">
            Sorry page was not found
          </h6>
          <p className="my-2">
            Whoops! It looks like this page got lost.
          </p>
          <div className="my-6">
            <Link
              to="/dashboard"
              className="bg-main-btn-color hover:bg-main-btn-hover p-4 rounded text-white"
            >
              Back To Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashErrorPage;
