import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import EditUsers from "../../components/UserSection/EditUsers";
import { AiOutlineDelete } from "react-icons/ai";
import AddUser from "../../components/UserSection/AddUser";
import CardContainer from "../../components/Global/CardContainer";
import DialogBox from "../../components/Global/DialogBox";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import moment from "moment";
import { IoMdSad } from "react-icons/io";

const Users = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data, refetch, error } = useGetUsersQuery(page);
  const [deleteUser] = useDeleteUserMutation();
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
        await deleteUser(id);
        toast.success("User deleted successfully");
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
          Users
        </h3>
        <div className="">
          <AddUser />
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
                    USERNAME
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    EMAIL
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    ROLE
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    ACCOUNT ACTIVE
                  </th>
                  <th scope="col" className=" px-3 py-3 ">
                    DATE REGISTERED
                  </th>

                  <th scope="col" className=" px-3 py-3">
                    ACTIONS
                  </th>
                </tr>
              </thead>

              {data.users.length < 1 ? (
                <tbody className="absolute right-0 left-0 overflow-y-visible translate-y-1/2 top-1/2">
                  <div className="text-center w-full">
                    <IoMdSad size={50} className="inline text-slate-700" />
                    <p>Customers list is empty</p>
                  </div>
                </tbody>
              ) : (
                <tbody>
                  {data.users.map((user, index, count) => (
                    <tr className="border-b px-3 py-3" key={user._id}>
                      <td className="border-b px-3 py-3">
                        {(data.page - 1) * data.pageSize + index + 1}
                      </td>
                      <td className="border-b px-3 py-3">{user.username}</td>
                      <td className="border-b px-3 py-3">{user.email}</td>
                      <td className="border-b px-3 py-3">{user.role}</td>
                      {user.active === true ? (
                        <td className="border-b px-3 py-3">
                          <span className="">Yes</span>
                        </td>
                      ) : (
                        <td className="border-b px-3 py-3">
                          <span>No</span>
                        </td>
                      )}
                      <td className="border-b px-3 py-3 whitespace-nowrap">
                        {dateFormat(user.createdAt)}
                      </td>
                      <td className="border-b px-3 py-3">
                        <span className="flex justify-start space-x-4 align-items-center">
                          <EditUsers className="mx-10" user={user} />

                          <AiOutlineDelete onClick={() => setOpen(true)} />
                          {open && (
                            <DialogBox
                              open={open}
                              setOpen={setOpen}
                              dialogLabel={dialogLabel}
                              dialogInfo={dialogInfo}
                              buttonLabel={buttonLabel}
                              handleSubmit={() => handleSubmit(user._id)}
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
    
          {data.users.pages !== 0 ? (
            <Paginate page={page} data={data} setPage={setPage} />
          ) : (
            " "
          )}
        </>
      )}
    </CardContainer>
  );
};

export default Users;
