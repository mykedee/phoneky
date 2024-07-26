import "swiper/css";
import "swiper/css/navigation";
import {
  useGetProductsQuery,
} from "../../slices/productApiSlice";

import { Link } from "react-router-dom";

const ProductCards = () => {
  const formatMoney = (num) =>
    "₦" + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // const size = 6;


   const { data } = useGetProductsQuery({});


  const latestProduct = data?.products?.map((product) => (
  
      <div
        className="product-image-card bg-white rounded-lg text-slate-700 my-3"
        
      >
      <Link to={`/products/${product.slug}`} className="w-full my-2">
        <img
          src={product.photos[0].img}
          alt=""
          className="product-image-card"
        />
        <div className="text-center font-semibold text-sm mx-1 ">
          <h1 className="my-1">{product.title.substring(0, 25)}..</h1>
          <p className="font-bold p-1">{formatMoney(product.price)}</p>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="my-6 text-slate-700">
      <section className="my-4 lg:my-10">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-lg font-bold ">Latest Products</h2>
        </div>
         <div
      className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 gap-2 lg:gap-6 my-2 md:my-3"
    > {latestProduct}</div>
       
      </section>
    </div>
  );
};

export default ProductCards;
