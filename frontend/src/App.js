import React from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Global/NavBar";
import Footer from "./components/Global/Footer";

function App() {
  return (
    <>
      <NavBar />
      <main className="relative lg:top-0 pt-10 lg:py-2">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
