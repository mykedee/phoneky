import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCart } from "../../slices/globalSlice";
import CartCard from "./CartCard";
import { BsBasket } from "react-icons/bs";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const dispatch = useDispatch();
  const cartCard = useSelector((state) => state.global.cartCard);
  const { cartItems } = useSelector((state) => state.cart);
  const [isopen, setIsOpen] = useState(false);
  const openNav = () => {
    setIsOpen(!isopen);
  };

  return (
    <>
      <header class="fixed lg:relative z-50 w-full bg-main-btn-color lg:h-24 h-28">
        <div className="w-full text-slate-50 py-3 lg:py-4">
          <nav className="flex items-center justify-between w-11/12 mx-auto">
            <div className="flex items-center gap-1">
              <div className="lg:hidden block">
                <div className="flex items-center space-x-2" onClick={openNav}>
                  <div className={isopen ? "hamburger" : ""}>
                    <span className="mobile-nav-span"></span>
                    <span className="mobile-nav-span"></span>
                    <span className="mobile-nav-span"></span>
                  </div>                
                </div>
              </div>
              <Link to="/">
                <h1 className="font-bold text-2xl">Phoneky</h1>     
              </Link>
            </div>

            {/* search bar desktop */}
            <div className="relative lg:w-5/12 mx-auto hidden lg:block">
              <SearchBar />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <Link to="/">Login</Link>
              <div>
                <>{cartCard ? <CartCard /> : ""}</>
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => dispatch(toggleCart({}))}
                >
                  <BsBasket className="cartIcon" />
                  <p className="md:block hidden">Cart</p>
                  <div
                    className={`absolute inline-flex items-center justify-center w-4 h-4 top-[16px] text-xs text-primary-green bg-white dark:bg-primary-orange border-1 border-white rounded-full dark:border-gray-900 ${
                      cartItems.length > 0 ? "block" : "hidden"
                    }`}
                  >
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </div>
                </div>
              </div>     
            </div>
          </nav>
        </div>
        {/* mobile search */}
        <div className="relative lg:w-5/12 mx-auto lg:hidden w-11/12">
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default NavBar;
