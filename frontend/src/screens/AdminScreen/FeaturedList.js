import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import EditProduct from "../../components/ProductSection/EditProduct";
import { AiOutlineDelete } from "react-icons/ai";
import AddFeaturedProduct from "../../components/ProductSection/AddFeaturedProduct";
import CardContainer from "../../components/Global/CardContainer";
import DialogBox from "../../components/Global/DialogBox";
import Paginate from "../../components/Paginate";
import moment from "moment";
import { useGetFeaturedQuery } from "../../slices/featuredApiSlice";
import { IoMdSad } from "react-icons/io";

const FeaturedList = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data, error } = useGetFeaturedQuery();
  const [open, setOpen] = useState(false);
  const dialogLabel = "Are you sure?";
  const dialogInfo = "You won't be able to revert this!";
  const buttonLabel = "Yes, Delete";

  const dateFormat = (date) => {
    return moment(date).utcOffset(0).format("MMMM DD YYYY (hh:mm:ss a)");
  };

  return (
    <CardContainer>
      <div className="flex justify-between items-center my-2">
        <h3 className="text-left text-slate-700 dark:text-white py-3 md:text-base font-bold text-sm">
          Featured Products
        </h3>
        <div className="">
          <AddFeaturedProduct />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <>
          <div className="relative overflow-x-auto  rounded-t-lg shadow-b-0 bg-white">
            <table className="relative table-auto w-full dark:bg-slate-600 bg-white min-h-[500px]">
              <thead className="text-left text-slate-600 dark:text-white text-sm border-b px-3 py-3">
                <tr className="whitespace-nowrap">
                  <th scope="col" className=" px-3 py-3">
                    #
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    TITLE
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    IMAGE
                  </th>

                  <th scope="col" className=" px-3 py-3">
                    Url
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    FEATURED
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    CREATED AT
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>

              {data.featured.length < 1 ? (
                <div className="[h-500px]">
                  <tbody className="absolute right-0 left-0 overflow-y-visible translate-y-1/2 top-1/2">
                    <div className="text-center w-full text-slate-700">
                      <IoMdSad size={50} className="inline " />
                      <p>Featured product list is empty</p>
                    </div>
                  </tbody>
                </div>
              ) : (
                <tbody>
                  {data?.featured?.map((product, index, count) => (
                    <tr className="border-b px-3 py-3" key={product._id}>
                      <td className="border-b px-3 py-3">
                        {(data.page - 1) * data.pageSize + index + 1}
                      </td>

                      <td className="text-sm">{product.title}</td>

                      <td className="border-b px-3 py-3 h-[30px] w-[30px]">
                        <img
                          src={product.photo}
                          alt=""
                          className="rounded-lg"
                        />
                      </td>

                      <td className="border-b px-3 py-3 h-[30px] w-[30px]">
                        <p className="rounded-lg">{product.url}</p>
                      </td>

                      <td className="border-b px-3 py-3 whitespace-nowrap">
                        <label class="inline-flex items-center cursor-pointer">
                          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green-lite dark:peer-focus:ring-orange-lite rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-green dark:peer-checked:bg-primary-orange"></div>
                          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                           
                          </span>
                        </label>
                      </td>

                      <td className="border-b px-3 py-3 whitespace-nowrap">
                        {dateFormat(product.createdAt)}
                      </td>
                      <td className="border-b px-3 py-3">
                        <span className="flex justify-start space-x-4 align-items-center">
                          <EditProduct className="mx-10" product={product} />

                          <AiOutlineDelete onClick={() => setOpen(true)} />
                          {open && (
                            <DialogBox
                              open={open}
                              setOpen={setOpen}
                              dialogLabel={dialogLabel}
                              dialogInfo={dialogInfo}
                              buttonLabel={buttonLabel}
                            />
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>

          {data.featured.pages >= 1 && (
            <Paginate page={page} data={data} setPage={setPage} />
          )}
        </>
      )}
    </CardContainer>
  );
};

export default FeaturedList;
