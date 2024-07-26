import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import EditProduct from "../../components/ProductSection/EditProduct";
import { AiOutlineDelete } from "react-icons/ai";
import AddProduct from "../../components/ProductSection/AddProduct";
import CardContainer from "../../components/Global/CardContainer";
import DialogBox from "../../components/Global/DialogBox";
import { useDeleteProductMutation } from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import moment from "moment";


import {
  useGetProductsQuery
} from "../../slices/productApiSlice";
import { IoMdSad } from "react-icons/io";

const ProductList = () => {
  let [page, setPage] = useState(1);

  const { isLoading, data, refetch, error } = useGetProductsQuery({
    page,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [open, setOpen] = useState(false);
  const dialogLabel = "Are you sure?";
  const dialogInfo = "You won't be able to revert this!";
  const buttonLabel = "Yes, Delete";

  const dateFormat = (date) => {
    return moment(date).utcOffset(0).format("MMMM DD YYYY (hh:mm:ss a)");
  };

  const handleSubmit = async (id) => {
    if (open === true) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        setOpen(false);
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  return (
    <CardContainer>
      <div className="flex justify-between items-center my-2">
        <h3 className="text-left text-slate-700 dark:text-white py-3 md:text-base font-bold text-sm">
          Products
        </h3>
        <div className="">
          <AddProduct />
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
                    PRICE
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    PRODUCT CODE
                  </th>
                 
                  <th scope="col" className=" px-3 py-3">
                    CREATED AT
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>

              {data.products.length < 1 ? (
                <div className="[h-500px]">
                  <tbody className="absolute right-0 left-0 overflow-y-visible translate-y-1/2 top-1/2">
                    <div className="text-center w-full">
                      <IoMdSad size={50} className="inline text-slate-700" />
                      <p>Products list is empty</p>
                    </div>
                  </tbody>
                </div>
              ) : (
                <tbody>
                  {data?.products?.map((product, index, count) => (
                    <tr className="border-b px-3 py-3" key={product._id}>
                      <td className="border-b px-3 py-3">
                        {(data.page - 1) * data.pageSize + index + 1}
                      </td>

                      <td
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: product.title.substring(0, 19),
                        }}
                      />

                      <td className="border-b px-3 py-3 h-[30px] w-[30px]">
                        {product.photos.length !== 0 ? (
                          <img
                            src={product.photos[0].img}
                            alt=""
                            className="rounded-lg"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>

                      <td className="border-b px-3 py-3 whitespace-nowrap">
                        {product.price}
                      </td>
                      <td className="border-b px-3 py-3 whitespace-nowrap">
                        {product.productCode}
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
                              handleSubmit={() => handleSubmit(product._id)}
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

          {data.products.pages !== 0 ? (
            <Paginate page={page} data={data} setPage={setPage} />
          ) : (
            " "
          )}

        </>
      )}
    </CardContainer>
  );
};

export default ProductList;
