import React, { useState } from "react";
import { useCreateCategoryMutation } from "../../slices/categoryApiSlice";
import { toast } from "react-toastify";

const AddCategory = (props) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [show, setShow] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const handleClose = () => {
    setShow(false);
    setPhoto("");
    setName("");
  };
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const formData = new FormData();
  const handleUpload = (e) => {
    e.preventDefault();
    setPhoto(e.target.files[0]);
    // formData.append("photo", e.target.files[0]);
    // console.log(formData.append("photo", e.target.files[0]));
  };
  const createCategoryHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);

    try {
      const res = await createCategory(formData).unwrap();
      if (res.success) {
        setShow(false);
        toast.success("Category created successfully");
        // setPhoto("");
        // setName("");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="form-area">
      <span className="" onClick={handleShow}>
        <div className="p-2 lg:p3 text-base  dark:bg-primary-orange dark:hover:bg-primary-orange-hover bg-main-btn-color hover:bg-main-btn-hover text-slate-50 rounded cursor-pointer">
          + Create Category
        </div>
      </span>

      {show && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] max-h-full overflow-y-scroll">
          <div className="relative mb-28  w-11/12 lg:w-1/2 top-24 bottom-0 mx-auto max-w-2xl max-h-full">
            <div className="relative bg-white dark:bg-slate-700 dark:text-zinc-50 rounded-lg shadow">
              <div className="flex items-start justify-between px-8 py-4 border-b rounded">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">
                  Create Category
                </h3>
                <button
                  className="text-sm text-gray-900 dark:text-zinc-50"
                  show={false}
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>

              {/* <!--modal body--> */}
              <div className="px-8 py-4">
                <form id="edit-modal" onSubmit={createCategoryHandle}>
                  <div className="mb-3" controlId="exampleForm.ControlInput1">
                    <input
                      className="w-full p-2 border rounded"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Category Name"
                    />
                    <input
                      type="file"
                      className="block my-2"
                      onChange={handleUpload}
                    />
                  </div>
                  {/* <select>
                    <option>Select Category</option>
                    {createCategoryList(category.categories).map((option) => (
                      <option key={option.value}>{option.name}</option>
                    ))}
                  </select> */}

                  {/* <!-- modal footer--> */}
                  <div className="flex items-center justify-end mt-10 py-10 space-x-2 border-gray rounded-b">
                    <button
                      variant="secondary"
                      onClick={handleClose}
                      className="text-sm text-white bg-red-500 p-3 rounded"
                    >
                      Close
                    </button>
                    <button
                      id="edit-modal"
                      type="submit"
                      className="p-3 text-sm rounded dark:bg-primary-orange bg-primary-green text-white"
                    >
                      Create Category
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
