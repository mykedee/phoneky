import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader/Loader";
import { IoMdSad } from "react-icons/io";
import { addItem } from "../slices/recentlyViewedSlice";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const formatMoney = (num) =>
    "₦" + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const recentlyViewedItems = useSelector(
    (state) => state.recentlyViewed.items
  );
  const { keyword } = useParams();
  const { isLoading, error, data } = useGetProductsQuery({
    keyword,
  });
  const dispatch = useDispatch();
  const handleViewItem = (itemId) => {
    dispatch(addItem({ itemId }));
    console.log(itemId);
  };

  return (
    <section className="w-11/12 mx-auto text-text-color">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data.message || error.error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:my-3">
            {data.products.length < 1 && (
              <div className="w-full md:w-1/2 mx-auto text-center my-28">
                <IoMdSad size={50} className="inline " />
                <p className="font-bold">There are no results for {keyword}</p>
                <p>- Please check your spelling for typing errors </p>
                <p>- Try searching with simple keywords </p>
                <p>- Try searching using general terms or words</p>
                <div className="my-6">
                  <Link
                    to="/"
                    className="bg-main-btn-color hover:bg-main-btn-hover p-4 rounded text-white"
                  >
                    Back To Homepage
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 gap-2 lg:gap-6 my-24 md:my-10">
            {data.products.map((product) => (
              <div className="bg-white rounded text-sm my-2" key={product._id}>
                <Link
                  to={`/products/${product.slug}`}
                  className="w-full my-10"
                  onClick={() => handleViewItem(product)}
                >
                  <Link to={`/products/${product.slug}`}>
                    <img
                      src={product.photos[0].img}
                      key={product.title}
                      className="product-image-card "
                      alt={product.title}
                    />
                    <div className="mx-1 text-center font-bold text-sm text-slate-700">
                      <h1 className="my-1">
                        {product.title.substring(0, 25)}..
                      </h1>
                      <p className=" p-1">{formatMoney(product.price)}</p>
                    </div>
                  </Link>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      <section>
        <h2 className="font-bold text-slate-700">Recently Searched Items</h2>
        <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 gap-2 lg:gap-6 my-3">
          {recentlyViewedItems?.map((itemId) => (
            <>
              <div className="bg-white rounded text-sm" key={itemId._id}>
                <Link to={`/products/${itemId.slug}`} className="w-full my-2">
                  <img
                    src={itemId.photos[0].img}
                    key={itemId.title}
                    className="product-image-card "
                    alt={itemId.title}
                  />

                  <div className="mx-1 text-center text-sm">
                    <h1 className="my-1">{itemId.title.substring(0, 25)}..</h1>
                    <p className="font-bold p-1">{formatMoney(itemId.price)}</p>
                  </div>
                </Link>
              </div>
            </>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Products;
