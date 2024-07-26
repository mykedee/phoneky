import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import {
  increaseCartItems,
  decreaseCartItems,
  removeCartItems,
} from "../../slices/cartSlice";
import { toggleCart } from "../../slices/globalSlice";
import { useGetProductDetailsQuery } from "../../slices/productApiSlice";
import { IoMdSad } from "react-icons/io";
import { toast } from "react-toastify";

const CartCard = () => {
  const { id: slug } = useParams();
  const { data: product} = useGetProductDetailsQuery(slug);

  const cart = useSelector((state) => state.cart);
  let CartCard = useSelector((state) => state.global.CartCard);
  const { cartItems } = cart;
  console.log(cartItems);

  let items = cartItems.map((item) => item.title);
  console.log(items);
  const dispatch = useDispatch();

  const handleDecrease = (slug) => {
    const itemToUpdate = cartItems.find((item) => item.slug === product.slug);

    if (itemToUpdate.qty > 1 && product.slug === itemToUpdate.slug) {
      dispatch(decreaseCartItems(slug));
    } else {
      dispatch(removeCartItems(slug));
    }
  };

  const handleIncrease = (slug) => {
    const itemToUpdate = cartItems.find((item) => item.slug === slug);
    if (itemToUpdate) {
      if (itemToUpdate.qty < product.qty) {
        dispatch(increaseCartItems(slug));
      } else {
        toast.info(`Item cannot exceed maximum of ${itemToUpdate.qty}`);
      }
    } else {
      dispatch(increaseCartItems(slug));
    }
  };

  return (
    <aside
      className={`min-w-full flex  h-[100vh] fixed top-0 left-0 z-50 ${
        CartCard ? "block" : "none"
      }`}
    >
      <div
        className="hidden md:block w-full md:bg-black-transparent transparent cursor-pointer"
        onClick={() => dispatch(toggleCart({}))}
      ></div>
      <div className="bg-white md:basis-11/12 lg:basis-5/12 w-full text-slate-900">
        <div className="w-full md:w-11/12 mx-auto h-[calc(100vh-1rem)] overflow-auto">
          <div className="w-10/12 mx-auto px-0 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold text-slate-700 ">
                Shopping Cart
              </h1>
              <span
                onClick={() => dispatch(toggleCart({}))}
                className="cursor-pointer border border-slate-500 rounded-full h-8 w-8 flex flex-col items-center justify-center"
              >
                <MdClose />
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex h-screen">
                <div className="flex flex-1 items-center justify-center text-center">
                  <div>
                    <IoMdSad size={50} className="inline text-slate-700" />
                    <div className="uppercase my-5">
                      <p className="my-4 text-slate-700">
                        Your Shopping Cart is empty
                      </p>

                      <Link
                        to="/"
                        className="p-2 rounded-lg bg-main-btn-hover text-slate-50  hover:font-bold"
                        onClick={() => dispatch(toggleCart({}))}
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
                    <div>
                      <div className="flex justify-between gap-2 my-5">
                        <div className="basis-1/5 ">
                          <img
                            src={item.photos[0].img}
                            alt="item._id"
                            className="w-full object-cover rounded-lg"
                          />
                        </div>

                        <div className="basis-3/5 lg:basis-3/4">
                          <div className="flex justify-between items-center">
                            <Link to={`/products/${item.slug}`}>
                              <div className="font-bold text-sm">
                                {item.title}{" "}
                              </div>
                            </Link>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex basis-1/5 items-center border my-1">
                              <button
                                className="h-9 w-9"
                                onClick={() => handleDecrease(item.slug)}
                              >
                                -
                              </button>
                              <input
                                className=" border h-9 w-9 text-center"
                                value={item.qty}
                                // onChange={(e) => setQty(e.target.value)}
                              />
                              <button
                                className=" h-9 w-9"
                                onClick={() => handleIncrease(item.slug)}
                              >
                                +
                              </button>
                            </div>
                            <div className="font-bold mx-2">
                              {" "}
                              ₦
                              {cartItems
                                .reduce(
                                  (acc, item) => acc,
                                  item.qty * item.price,
                                  0
                                )
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            onClick={() => dispatch(removeCartItems(item.slug))}
                            className="cursor-pointer text-white bg-main-btn-color hover:bg-red-500 p-1 rounded-full "
                          >
                            <MdClose size={10} />
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                ))}
                <div className="my-10 flex items-center justify-between uppercase font-bold">
                  <div>Subtotal</div>
                  <div>₦{cart.itemsPrice}</div>
                </div>
                <div className="my-2">
                  <Link to="/checkout" onClick={() => dispatch(toggleCart({}))}>
                    <button className="w-full bg-main-btn-color hover:bg-main-btn-hover h-12 text-slate-50 font-bold rounded">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CartCard;
