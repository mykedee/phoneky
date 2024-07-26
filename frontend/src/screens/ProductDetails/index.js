import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  increaseCartItems,
  decreaseCartItems,
  addToCart,
} from "../../slices/cartSlice";

import {
  useGetProductDetailsQuery,
  useGetRelatedProductsQuery,
} from "../../slices/productApiSlice";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import Loader from "../../components/Loader/Loader";
import { useParams, Link } from "react-router-dom";
import { toggleCart } from "../../slices/globalSlice";
import ProductDetailAccordion from "../../components/ProductSection/ProductDetailAccordion";
import ScrollToTop from "../../components/Global/ScrollToTop";
import { toast } from "react-toastify";
import MetaData from "../../components/MetaData";

const ProductDetails = () => {
  const { id: Id } = useParams();
  const { id: slug } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { data: product, isLoading, error } = useGetProductDetailsQuery(slug);
  const { data } = useGetRelatedProductsQuery(Id);
  const [value, setValue] = useState(0);

  const [slideIndex, setSlideIndex] = useState(1);
  const formatMoney = (num) =>
    "₦" + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleCart = () => {
    dispatch(addToCart({ ...product, qty }));
    dispatch(toggleCart(true));
  };

  const handleNextSlide = () => {
    if (slideIndex !== product.photos.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === product.photos.length) {
      setSlideIndex(1);
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(product.photos.length);
    }
  };

  const increaseCartItemsHandler = () => {
    if (qty < product.qty) {
      dispatch(increaseCartItems(Id, setQty(Math.max(qty + 1, 1))));
    } else if (product.qty === 0) {
      toast.info(`Item is out of stock ${product.qty}`);
    } else {
      toast.info(`Item cannot exceed maximum of ${product.qty}`);
    }
  };
 
  useEffect(() => {
    // Reset the state of all items on page load
    setQty(1);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="w-11/12 mx-auto">
          <Loader />
        </div>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <section className="w-11/12 mx-auto md:mt-7 mt-20 bg-white p-2 rounded">
          <div className="flex flex-col md:flex-row justify-between md:gap-6 lg:gap-6">
            <div className="basis-1/2 gap-2 py-5 mt-6 md:mt-0 md:border-r">
              <div className="relative">
                <MetaData title={product.title} />
                {product?.photos?.map((photo, index) => (
                  <div
                    key={photo._id}
                    className={
                      slideIndex === index + 1 ? "lg:relative" : "hidden"
                    }
                  >
                    <img
                      src={photo.img}
                      alt={product.title}
                      key={product.title}
                      className="h-[300px] lg:hidden lg:h-[480px] w-full object-contain rounded my-3"
                    />
                    <ul className="lg:hidden">
                      <li>
                        <button
                          className="left-2 absolute top-[50%] -translate-y-1/2 bg-main-btn-hover p-3 rounded-full text-slate-50"
                          onClick={handlePrevSlide}
                        >
                          <MdOutlineArrowBackIosNew />
                        </button>
                      </li>
                      <li>
                        <button
                          className="right-2 -translate-y-1/2 absolute top-[50%] bg-main-btn-hover p-3 rounded-full text-slate-50"
                          onClick={handleNextSlide}
                        >
                          <MdOutlineArrowForwardIos />
                        </button>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>

              {/* large image and index thumb */}
              <img
                src={product.photos[value].img}
                alt={product.title}
                key={product.title}
                className="lg:block hidden h-[300px] lg:h-[480px] w-full object-contain rounded-lg my-3"
              />

              {product?.photos?.map((photo, index) => (
                <ul
                  onClick={() => setValue(index)}
                  className={`p-2 hidden lg:inline`}
                >
                  <img
                    src={photo.img}
                    alt={photo._id}
                    key={photo._id}
                    className={` ${
                      index === value &&
                      "border-4 h-[100px lg:w-[100px] border-main-btn-hover thumbnails"
                    } inline w-[90px] h-[100px] lg:w-[100px] lg:h-[100px] object-cover rounded my-3 cursor-pointer `}
                  />
                </ul>
              ))}
            </div>

            <div className="basis-1/2 lg:px-5 lg:py-5 py-0">
              <h1 className="font-bold text-2xl capitalize">{product.title}</h1>
              <p className="text-xs lg:text-sm">
                Product Code : {product.productCode}
              </p>

              {product.qty < 1 ? (
                <p className="bg-red-400 p-1 w-2/12 my-2 text-slate-50 text-center text-xs rounded-3xl ">
                  Out of Stock{" "}
                </p>
              ) : (
                <p className="bg-primary-orange p-1 w-4/12 lg:w-2/12 my-2 text-slate-50  text-xs text-center rounded-3xl">
                  In Stock
                </p>
              )}

              <hr />
              <h1 className="font-bold text-lg p-3">
                {formatMoney(product.price)}
              </h1>

              {/* accordion area*/}

              <ProductDetailAccordion
                title="Description"
                description={product.description}
                alwaysOpen
              />
              <hr />

              <p className="p-3 text-xs text-red-700">
                Qty in Stock: {product.qty}
              </p>

              <div className="flex flex-row items-center gap-2 md:gap-3 mx-auto mb-2">
                <div className=" flex items-center border">
                  <button
                    className="h-12 w-12 bg-white rounded-r"
                    onClick={() =>
                      dispatch(
                        decreaseCartItems(Id, setQty(Math.max(qty - 1, 1))),
                      )
                    }
                  >
                    -
                  </button>
                  <input className="border h-12 w-12 text-center" value={qty} />
                  <button
                    className="bg-white h-12 w-12 rounded-r"
                    disabled={product.qty < 1}
                    onClick={() => increaseCartItemsHandler(Id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="border bg-main-btn-color hover:bg-main-btn-hover rounded w-1/2 md:w-2/5 lg:w-1/5 h-12 font-bold text-slate-50 disabled:opacity-60"
                  disabled={product.qty < 1}
                  onClick={handleCart}
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-5 md:mt-0">
                <ProductDetailAccordion
                  title="Delivery & Shipping Information"
                  shippingInfo={
                    <>
                     
                      <ul className="p-3">
                        <p className="font-bold mb-2">
                          How long does it take to deliver?{" "}
                        </p>
                        <li className="list-disc list-outside mb-2">
                          We deliver within 24 to 72 hours.
                        </li>
                        <p className="font-bold mb-2">
                          How much does delivery cost?{" "}
                        </p>
                        <li className="list-disc list-outside mb-2">
                          Delivery fee will be calculated at the point of
                          checkout (when you enter your address)
                        </li>
                      </ul>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {/* similar products section */}
      <section className="w-11/12 mx-auto my-6">
        <h1 className="font-bold text-xl">Similar Products</h1>
        <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 gap-2 lg:gap-6 my-3">
          {data?.related?.map((item) => (
            <div className="bg-white rounded" key={item.slug}>
              <Link to={`/products/${item.slug}`} className="w-full my-2">
                <img
                  src={item.photos[0].img}
                  key={item.title}
                  alt=""
                  className="h-35 lg:h-52 w-full rounded object-cover"
                />

                <div className="mx-1 text-center font-semibold text-sm">
                  <h2 className=" my-1">{item.title.substring(0, 25)}...</h2>
                  <p className="font-bold p-1"> {formatMoney(item.price)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <ScrollToTop />
      </section>
    </>
  );
};
export default ProductDetails;
