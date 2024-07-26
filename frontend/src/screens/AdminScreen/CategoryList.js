import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import AddCategory from "../../components/CategorySection/AddCategory";
import CategoryEdit from "../../components/CategorySection/CategoryEdit";
import CardContainer from "../../components/Global/CardContainer";
import DialogBox from "../../components/Global/DialogBox";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import moment from "moment";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../slices/categoryApiSlice";

const CategoryList = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data, refetch, error, pages, pageSize } =
    useGetCategoriesQuery(page);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [open, setOpen] = useState(false);
  const dialogLabel = "Are you sure?";
  const dialogInfo = "You won't be able to revert this!";
  const buttonLabel = "Yes, Delete";

  const dateFormat = (date) => {
    return moment(date).utcOffset(0).format("  MMMM DD YYYY (hh:mm:ss a)");
  };

  const handleSubmit = async (id) => {
    if (open === true) {
      try {
        await deleteCategory(id);
        toast.success("Category deleted successfully");
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
          Categories
        </h3>
        <div className="">
          <AddCategory />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <>
          <div className="relative overflow-x-auto lg:overflow-x-hidden rounded-t-lg shadow-b-0 bg-white">
            <table className="table-auto w-full dark:bg-slate-600 bg-white">
              <thead className="text-left text-slate-600 dark:text-white text-sm border-b px-3 py-3">
                <tr className="whitespace-nowrap">
                  <th scope="col" className=" px-3 py-3">
                    #
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    NAME
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    CREATED AT
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    IMAGE
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.categories?.map((category, index, count) => (
                  <tr className="border-b px-3 py-3" key={category._id}>
                    <td className="border-b px-3 py-3">
                      {(data.page - 1) * data.pageSize + index + 1}
                    </td>
                    <td className="border-b px-3 py-3">
                      <span className="">{category.name}</span>
                    </td>
                    <td className="border-b px-3 py-3 whitespace-nowrap">
                      <span className="">{dateFormat(category.createdAt)}</span>
                    </td>
                    <td className="border-b px-3 py-3">
                      <span className="">
                        <img
                          src={category.photo}
                          className="h-[40px] w-[40px] rounded-lg" alt={category.name}
                        />
                      </span>
                    </td>
                    <td className="border-b px-3 py-3">
                      <span className="flex justify-start space-x-4 align-items-center">
                        <CategoryEdit className="mx-10" category={category} />

                        <AiOutlineDelete onClick={() => setOpen(true)} />
                        {open && (
                          <DialogBox
                            open={open}
                            setOpen={setOpen}
                            dialogLabel={dialogLabel}
                            dialogInfo={dialogInfo}
                            buttonLabel={buttonLabel}
                            handleSubmit={() => handleSubmit(category._id)}
                          />
                        )}
                      </span>
                    </td>
                  </tr>
                
                ))}
              </tbody>
              <tbody>
            
                {data?.categoryList?.map((category, index, count) => (
                  <>
                    {category.children.map((child, childIndex) => (
                      <tr className="border-b px-3 py-3">
                        <td className="border-b px-3 py-3">
                          {(data.page - 1) * data.pageSize +
                            index +
                            childIndex +
                            1}
                        </td>
                        <td className="border-b px-3 py-3">
                          <span className="">{child.name}</span>
                        </td>
                        <td className="border-b px-3 py-3">
                          <span className="">
                            {dateFormat(child.createdAt)}
                          </span>
                        </td>
                        <td className="border-b px-3 py-3">
                          <span className="">
                            <p>category image</p>
                          </span>
                        </td>
                        <td className="border-b px-3 py-3">
                          <span className="flex justify-start space-x-4 align-items-center">
                            <CategoryEdit className="mx-10" child={child} />

                            <AiOutlineDelete onClick={() => setOpen(true)} />
                            {open && (
                              <DialogBox
                                open={open}
                                setOpen={setOpen}
                                dialogLabel={dialogLabel}
                                dialogInfo={dialogInfo}
                                buttonLabel={buttonLabel}
                                handleSubmit={() => handleSubmit(category._id)}
                              />
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Paginate
            pages={pages}
            pageSize={pageSize}
            page={page}
            data={data}
            setPage={setPage}
          />
        </>
      )}
    </CardContainer>
  );
};

export default CategoryList;
