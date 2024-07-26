import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useGetLocationQuery,
  usePayStackUrlMutation,
} from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { IoMdSad } from "react-icons/io";
import ScrollToTop from "../components/Global/ScrollToTop";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [first_name, setFirstname] = useState(
    shippingAddress?.first_name || "",
  );
  const [last_name, setLastname] = useState(shippingAddress?.last_name || "");
  const [phone, setPhone] = useState(shippingAddress?.phone || "");
  const [email, setEmail] = useState(shippingAddress?.email || "");
  const [userstate, setuserState] = useState(shippingAddress?.userstate || "");
  const [subItems, setSubItems] = useState([]);
  const [lga, setLga] = useState(shippingAddress?.lga || "");
  const { data: locations } = useGetLocationQuery();
  const [payStackUrl] = usePayStackUrlMutation();
  const dispatch = useDispatch();

  const handleState = (e) => {

    const selectedTitle = e.target.value;
    setuserState(selectedTitle);

    const selectedItem = locations.find((item) => item.title === selectedTitle);
    setSubItems(selectedItem ? selectedItem.sub : []);
  };

  const handleLgaChange = (e) => {
    const selectedTitle = e.target.value;
    setLga(selectedTitle);
  };

  const handlePay = async (e) => {

    e.preventDefault();
    let amount = cart.itemsPrice.replace(/,/g, "");
    let data = {
      amount,
      email
      };

    try {
      const response = await payStackUrl(data)

      const { authorization_url } = response.data.authorization_url;

      const paymentWindow = window.open(authorization_url);

      if (paymentWindow) {
        const interval = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(interval);
          }
        }, 1000);
        dispatch(clearCartItems({}));
      } else {
        toast.error("Failed to open payment window.");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };

  return (
    <div className="w-11/12  xl:w-10/12 2xl:w-9/12 py-6 mx-auto">
      <div className="py-6">
        <Link
          to="/"
          className="p-3 rounded bg-[linear-gradient(90deg,_rgba(255,30,87,1)_0%,_rgba(212,89,48,1)_35%,_rgba(255,40,0,1)_100%)] text-slate-50"
        >
          <span>
            {" "}
            <MdArrowBackIos size={15} className="inline-block p-0" />
          </span>
          <span className="text-sm">Back</span>
        </Link>
      </div>

      <div className="bg-white text-text-color">
        <div className="p-2 md:p-5 rounded flex flex-col md:flex-row justify-between ">
          <div className="w-full lg:w-1/2 py-10 md:border-r-4 md:border-r-[linear-gradient(90deg,_rgba(146,146,146,1)_0%,_rgba(192,192,192,1)_35%,_rgba(164,164,164,1)_100%)]">
            <div className="w-full ">
              <h1 className="text-center text-4xl font-bold">Your Order</h1>

              <div className="w-full lg:w-10/12 mx-auto py-4">
                {cartItems.length === 0 ? (
                  <div className="flex my-10 items-center justify-center ">
                    <div className="text-center">
                      <div>
                        <IoMdSad size={50} className="inline text-slate-700" />
                        <div className="uppercase my-5">
                          <p className="my-4 text-slate-700">
                            Your Shopping Cart is empty
                          </p>

                          <Link
                            to="/"
                            className="p-3 rounded-lg bg-main-btn-hover text-slate-50  hover:font-bold"
                          >
                            GO SHOPPING
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div
                        className="flex justify-between items-center"
                        key={item._id}
                      >
                        <div className="w-full md:w-9/12 ">
                          <div className="flex gap-2 my-3">
                            <div className="basis-1/5 ">
                              <img
                                src={item.photos[0].img}
                                alt="item._id"
                                className="h-[45px] max-w-[70px] object-cover rounded-lg"
                              />
                            </div>

                            <div className="">
                              <div className="flex justify-between items-center">
                                <Link to={`/products/${item.slug}`}>
                                  <div className="font-bold text-sm text-text-color">
                                    {item.title}{" "}
                                  </div>

                                  <div className="bg-slate-200 my-1 rounded w-2/12 text-xs">
                                    <p className="p-0.5 text-center text-slate-700">
                                      qty {item.qty}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    ))}
                    <div className="w-full md:w-9/12">
                      <div className="my-10 flex items-center justify-between uppercase font-bold">
                        <div>Subtotal</div>
                        <div>₦{cart.itemsPrice}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 py-10">
            <h1 className="text-center font-bold text-4xl">Checkout</h1>
            <form className="w-full lg:w-2/3 mx-auto py-4" onSubmit={handlePay}>
              <div className="flex justify-between md:flex-row flex-col">
                <div className="mx-3 mb-4">
                  <label className="mb-1 text-sm font-semibold text-slate-500">
                    First Name
                  </label>

                  <div className="flex items-center justify-between">
                    <input
                      className="p-3 w-full text-sm font-medium text-slate-600  rounded border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-btn-hover focus:outline-none bg-transparent"
                      placeholder="First Name"
                      onChange={(e) => setFirstname(e.target.value)}
                      value={first_name}
                      type="text"
                      required
                    />
                  </div>
                </div>

                <div className="mx-3 mb-4 ">
                  <label className="block mb-1 text-sm font-semibold text-slate-500">
                    Last name
                  </label>

                  <div className="flex items-center justify-between">
                    <input
                      className="p-3 w-full text-sm font-medium text-slate-600 rounded border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-btn-hover focus:outline-none bg-transparent"
                      placeholder="Enter Last Name"
                      onChange={(e) => setLastname(e.target.value)}
                      value={last_name}
                      type="text"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mx-3 mb-4 ">
                <label className="mb-1 text-sm font-semibold text-slate-500">
                  Email
                </label>

                <div className="relative flex items-center justify-between">
                  <input
                    className="p-3 w-full text-sm font-medium text-slate-600  rounded border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-btn-hover focus:outline-none bg-transparent"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="mx-3 mb-4 ">
                <label className="mb-1 text-sm font-semibold text-slate-500">
                  Address
                </label>

                <div className="relative flex items-center justify-between">
                  <input
                    className="p-3 w-full text-sm font-medium text-slate-600  rounded border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-btn-hover focus:outline-none bg-transparent"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    placeholder="Enter Address"
                    required
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col justify-between">
                <div className="mx-3 mb-4">
                  <label className="block mb-1 text-sm font-semibold text-slate-500 dark:text-slate-200">
                    State
                  </label>
                  <select
                    id="role"
                    className="rounded border-0 p-3 w-full border-slate-200 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:primary-green-lite"
                    onChange={handleState}
                    value={userstate}
                  >
                    <option selected>Select State</option>
                    {locations?.map((item) => (
                      <option value={item.title} key={item.id}>
                        {item.title.replace(/^./, (str) => str.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mx-3 mb-4 ">
                  <label className="block mb-1 text-sm font-semibold text-slate-500 dark:text-slate-200">
                    Local Government
                  </label>

                  <select
                    onChange={handleLgaChange}
                    value={lga}
                    className="rounded border-0 p-3 w-full border-slate-200 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:primary-green-lite"
                  >
                    <option selected>Select Local Government</option>
                    {subItems?.map((sub) => (
                      <option value={sub.title} key={sub.id}>
                        {sub.title.replace(/^./, (str) => str.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mx-3 mb-4 ">
                <label className="mb-1 text-sm font-semibold text-slate-500">
                  Phone Number
                </label>

                <div className="relative flex items-center justify-between">
                  <input
                    className="p-3 w-full text-sm font-medium text-slate-600  rounded border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-main-btn-hover focus:outline-none bg-transparent"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="number"
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>
              </div>

              <div className="mx-3">
                <button className="p-3 text-slate-50 bg-[linear-gradient(90deg,_rgba(255,30,87,1)_0%,_rgba(212,89,48,1)_35%,_rgba(255,40,0,1)_100%)] rounded w-full">
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Checkout;
