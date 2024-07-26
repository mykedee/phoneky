import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateProductMutation } from "../../slices/productApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoryApiSlice";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

const AddProduct = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");
  const [photos, setPhotos] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);

  const [createProduct] = useCreateProductMutation();
  const { data } = useGetCategoriesQuery();

  const handleDragStart = (index, event) => {
    event.dataTransfer.setData("index", index);
    console.log(index);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const index = event.dataTransfer.getData("index");
    const newIndex = event.target.dataset.index;

    // Create copies of image previews and images
    const updatedPreviews = [...imgPreviews];
    const updatedImages = [...photos];

    // Swap image previews
    const tempPreview = updatedPreviews[index];
    updatedPreviews[index] = updatedPreviews[newIndex];
    updatedPreviews[newIndex] = tempPreview;

    // Swap images
    const tempImage = updatedImages[index];
    updatedImages[index] = updatedImages[newIndex];
    updatedImages[newIndex] = tempImage;

    setImgPreviews(updatedPreviews);
    setPhotos(updatedImages);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImgPreviews(previews);
        }
      };

      reader.readAsDataURL(file);
    }
    setPhotos(files);
    console.log("Images:", files);
  };

  const handlePreviewDelete = (index) => {
    const updatePreview = [...imgPreviews];
    updatePreview.splice(index, 1);
    setImgPreviews(updatePreview);
    const updateImages = [...photos];
    updateImages.splice(index, 1);
    setPhotos(updateImages);
  };

  const createProductHandler = async (e) => {
    e.preventDefault();

    if (photos.length === 0) {
      console.error("No images selected.");
      return;
    }
    const formData = new FormData();
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("category", category);

    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }

    try {
      const res = await createProduct(formData).unwrap();
      console.log(typeof formData);
      if (res.success) {
        setShow(false);
        toast.success("Product created successfully");
        setTitle("");
        setPhotos("");
        setCategory("");
        setPrice("");
        setQty("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image"],
      ],
    },
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="form-area">
      <span className="" onClick={handleShow}>
        <div className="p-2 lg:p3 text-base  dark:bg-primary-orange dark:hover:bg-primary-orange-hover bg-main-btn-color hover:bg-main-btn-hover text-slate-50 rounded cursor-pointer">
          + Create Product
        </div>
      </span>

      {show && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] max-h-full overflow-y-scroll">
          <div className="relative mb-28  w-11/12 lg:w-1/2 top-24 bottom-0 mx-auto max-w-2xl max-h-full">
            <div className="relative bg-white dark:bg-slate-700 dark:text-zinc-50 rounded-lg shadow">
              <div className="flex items-start justify-between px-8 py-4 border-b rounded">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">
                  Create Product
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
                <form
                  id="edit-modal"
                  enctype="multipart/form-data"
                  onSubmit={createProductHandler}
                >
                  <div className="mb-3">
                    <input
                      className="w-full p-2 border rounded dash-input-field"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Product Title"
                    />
                  </div>

                  <ReactQuill
                    className="h-28 md:h-48 mb-48 lg:mb-20 rounded text-gray-900 hover:dark:text-zinc-50 dark:text-zinc-50"
                    modules={modules}
                    theme="snow"
                    value={description}
                    placeholder="Add description"
                    // onEditorChangeText={(e) => setDescription(e.target.value)}
                    onChange={setDescription}
                  />

                  <div className="mb-3">
                    <input
                      className="w-full p-2 border rounded dash-input-field"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter Price"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      className="w-full p-2 border rounded dash-input-field"
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      placeholder="Enter Quantity"
                    />
                  </div>

                  <div className="mb-3">
                    <select
                      id="role"
                      className="w-full p-2 border rounded dash-input-field"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option selected>Select category</option>
                      {data?.categories?.map((category) => (
                        <option value={category._id}>
                          {category.name.replace(/^./, (str) =>
                            str.toUpperCase()
                          )}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <input type="file" multiple onChange={handleUpload} />

                    <div onDrop={handleDrop} onDragOver={handleDragOver}>
                      <div
                        className={`${
                          imgPreviews.length > 1 ? "border py-2" : ""
                        } flex mt-2`}
                      >
                        {imgPreviews.map((preview, index) => (
                          <div
                            className="relative"
                            key={index}
                            data-index={index}
                            draggable
                            onDragStart={(event) =>
                              handleDragStart(index, event)
                            }
                          >
                            <img
                              key={index}
                              src={preview}
                              alt={`Selected ${index}`}
                              className=" max-h-12 max-w-12 border mx-2 rounded"
                            />
                            <span
                              className="cursor-pointer absolute right-0 -top-1 border rounded-full p-1 text-white bg-primary-green-prelite  "
                              onClick={() => handlePreviewDelete(index)}
                            >
                              <MdClose size={10} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

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
                      Create Product
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

export default AddProduct;
