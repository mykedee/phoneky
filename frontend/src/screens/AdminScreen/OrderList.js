import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useGetOrdersQuery,
  //   useDeletePostMutation,
} from "../../slices/ordersApiSlice";
import CardContainer from "../../components/Global/CardContainer";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Errors/Message";
import DialogBox from "../../components/Global/DialogBox";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import moment from "moment";

const OrderList = () => {
  const [page, setPage] = useState(1);
  const { isLoading, refetch, data, error, pages, pageSize, count } =
    useGetOrdersQuery(page);
  const [open, setOpen] = useState(false);
  const dateFormat = (date) => {
    return moment(date).utcOffset(0).format("  MMMM DD YYYY (hh:mm:ss a)");
  };

  const formatMoney = (num) =>
    "₦" + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <CardContainer>
      <div className="flex justify-between items-center my-2">
        <div>
          <h3 className="text-left text-slate-700 py-3 md:text-base font-bold text-sm dark:text-slate-50">
            Orders
          </h3>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <div className="relative overflow-x-auto lg:overflow-x-hidden rounded-t-lg shadow bg-white">
            <table className="table-auto w-full dark:bg-slate-600 bg-white svg:dark">
              <thead className="text-left text-sm text-slate-600 dark:text-white border-b">
                <tr className="whitespace-nowrap">
                  <th scope="col" className=" px-3 py-3">
                    #
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    ID
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    USER
                  </th>

                  <th scope="col" className=" px-3 py-3">
                    PAID
                  </th>

                  <th scope="col" className=" px-3 py-3 overflow-x">
                    DATE
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    TOTAL
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    DELIVERED
                  </th>

                  <th scope="col" className=" px-3 py-3">
                    DETAILS
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.orders.map((order, index) => (
                  <tr className="border-b px-3 py-3" key={order._id}>
                    <td className="border-b px-3 py-3">
                      {(data.page - 1) * data.pageSize + index + 1}
                    </td>
                    <td className="border-b px-3 py-3 whitespace-nowrap">
                      {order._id}
                    </td>
                    <td className="border-b px-3 py-3 whitespace-pre lg:whitespace-normal ">
                      {order.user.username}
                    </td>
                    <td className="border-b px-3 py-3 whitespace-nowrap">
                      {order.isPaid ? (
                        <span className="rounded bg-primary-green p-2 dark:bg-primary-orange text-slate-50 text-xs">
                          Paid
                        </span>
                      ) : (
                        <span className="rounded bg-red-400 p-2 text-slate-50 text-xs">
                          Not Paid
                        </span>
                      )}
                    </td>
                    <td className="border-b px-3 py-3 whitespace-nowrap">
                      {dateFormat(order.createdAt)}
                    </td>
                    <td className="border-b px-3 py-3 whitespace-nowrap">
                      {formatMoney(order.formattedItemsPrice)}
                    </td>

                    <td className="border-b px-3 py-3 whitespace-nowrap">
                      {order.isDelivered ? (
                        <span className="rounded bg-primary-green p-2 dark:bg-primary-orange text-slate-50 text-xs">
                          Delivered
                        </span>
                      ) : (
                        "Not Delivered"
                      )}
                    </td>
                    <td className="border-b px-3 py-3 whitespace-nowrap">
                      <Link
                        to={`/dashboard/orders/${order._id}`}
                        className="rounded bg-primary-green p-2 dark:bg-primary-orange text-slate-50 text-xs"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.orders.pages == 0 ? (
            " "
          ) : (
            <Paginate page={page} data={data} setPage={setPage} />
          )}
        </>
      )}
    </CardContainer>
  );
};

export default OrderList;
