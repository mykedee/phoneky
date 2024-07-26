import React from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { PaystackButton } from "react-paystack";
import {
  useGetOrderDetailsQuery,
} from "../../slices/ordersApiSlice";
import CardContainer from "../../components/Global/CardContainer";
import { toast } from "react-toastify";
import { FaPrint } from "react-icons/fa";

import { useSelector } from "react-redux";
import moment from "moment";

const Orders = () => {
  const dateFormat = (date) => {
    return moment(date).utcOffset(0).format("  MMMM DD YYYY (hh:mm:ss a)");
  };

  const { id: Id } = useParams();
  const {
    isLoading,
    data: order,
    error,
    refetch,
  } = useGetOrderDetailsQuery(Id);
  console.log(order);

  const { userInfo } = useSelector((state) => state.auth);

  const config = {
    reference: new Date().getTime().toString(),
    email: userInfo.user.email,
    amount: order.order.itemsPrice * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  };
  console.log(config);

  const componentProps = {
    ...config,
    text: "Pay",
    // onSuccess: (reference) => handlePaystackSuccessAction(reference),
    // onClose: handlePaystackCloseAction,
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(Id);
      refetch();
      toast.success("Order Delivered");
    } catch (error) {}
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CardContainer>
          <div className="relative overflow-x-auto lg:overflow-x-hidden rounded-t-lg shadow-b-0 dark:bg-slate-700 bg-white py-5">
            <div className="w-11/12 lg:w-8/12 mx-auto my-5">
              <div className="flex md:flex-row flex-col justify-between gap-2">
                <div>
                  <h3 className="font-bold text-lg">Shipping</h3>
                  <div className="flex gap-1 my-3">
                    <p className="font-bold">Name:</p>{" "}
                    <p>{order.order.user.username}</p>
                  </div>
                  <div className="flex gap-1 my-3">
                    <p className="font-bold">Email:</p> {order.order.user.email}
                  </div>
                  <div className="flex gap-1 my-3">
                    <p className="font-bold"> Address</p>
                    {order.order.shippingAddress.address},
                    {order.order.shippingAddress.city},
                    {order.order.shippingAddress.postalCode},
                    {order.order.shippingAddress.country}
                  </div>
                  {""}
                  {order.order.isDelivered ? (
                    <p>Delivered on : {dateFormat(order.order.deliveredAt)}</p>
                  ) : (
                    <p>Not Delivered</p>
                  )}

                  {order.order.isPaid ? (
                    <p>Paid on: {order.order.paidAt}</p>
                  ) : (
                    <p>Not Paid</p>
                  )}
                  <h3 className="font-bold text-base">Order Items</h3>
                  {order.order.orderItems.map((item) => (
                    <Link to={`/products/${item.slug}`} className="">
                      <div className="flex items-center gap-2 my-3">
                        <div className="basis-1/12">
                          <img
                            src={item.photos[0].img}
                            alt={item.name}
                            className="inline h-10 w-10 rounded-lg"
                          />
                        </div>
                        <div className="basis-7/12">
                          <Link
                            to={`/products/${item.slug}`}
                            className="font-semibold hover:underline"
                          >
                            {item.title}
                          </Link>
                        </div>

                        <div className="basis-4/12">
                          <p className=" text-sm">
                            {item.qty} X {item.price} = {item.qty * item.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div>
                  <h6 className="font-bold text-lg">Order Summary</h6>
                  <div>
                    <div>₦ {order.order.itemsPrice}</div>
                    {!order.order.isPaid && (
                      <button className="w-full mt-3 bg-primary-green text-white p-2 rounded-lg text-center">
                        <PaystackButton {...componentProps} />
                      </button>
                    )}
                  </div>
                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.user.role === "admin" &&
                    order.order.isPaid &&
                    !order.order.isDelivered && (
                      <button
                        className="p-3 bg-primary-green dark:bg-primary-orange text-slate-50 rounded-lg my-2"
                        onClick={deliverOrderHandler}
                      >
                        Mark As Delivered
                      </button>
                    )}
                </div>
              </div>
              <div className="text-center">
                {order.order.isPaid && (
                  <button
                    className="p-3 bg-primary-green dark:bg-primary-orange text-slate-50 rounded-lg my-2"
                    // onClick={deliverOrderHandler}
                  >
                    <FaPrint className="inline" />{" "}
                    <span className="text-xs">Print Receipt</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </CardContainer>
      )}
    </>
  );
};

export default Orders;
