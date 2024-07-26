import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useUpdateProductMutation } from "../../slices/productApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoryApiSlice";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const EditProduct = ({ product }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [qty, setQty] = useState(product.qty);
  const [photos, setPhotos] = useState(product.photos || []);
  const [imgPreviews, setImgPreviews] = useState([]);
  const { data } = useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product.photos) {
      const previews = product.photos.map((photo) => ({
        url: photo.img,
        isNew: false,
      }));
      setImgPreviews(previews);
    }
  }, [product.photos]);

  var toolbarOptions = [
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
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleDragStart = (index, event) => {
  //   event.dataTransfer.setData("index", index);
  //   console.log(index);
  // };

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

    // Update state with new image previews and files
    setImgPreviews(updatedPreviews);
    setPhotos(updatedImages);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    //  event.dataTransfer.dropEffect = "move";
  };

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   const files = Array.from(e.target.files);
  //   const previews = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       previews.push(reader.result);
  //       if (previews.length === files.length) {
  //         setImgPreviews(previews);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   }
  //   setPhotos(files);
  //   console.log("Images:", files);
  // };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      isNew: true,
    }));
    setImgPreviews((prev) => [...prev, ...newPreviews]);
    setPhotos((prev) => [...prev, ...files]);
  };

  // const handlePreviewDelete = (index) => {
  //   const updatePreview = [...imgPreviews];
  //   updatePreview.splice(index, 1);
  //   setImgPreviews(updatePreview);
  //   const updateImages = [...photos];
  //   updateImages.splice(index, 1);
  //   setPhotos(updateImages);
  // };

  const handlePreviewDelete = (index) => {
    const updatedPreviews = imgPreviews.filter((_, i) => i !== index);
    setImgPreviews(updatedPreviews);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProductEdit = async (id) => {
    // e.preventDefault()
    // if (photos.length === 0 && product.photos.length === 0) {
    //   toast.error("No images selected.");
    //   return;
    // }

    const newPhotos = photos.filter((photo) => typeof photo !== "string"); // new photos are File objects
    const existingPhotos = photos.filter((photo) => typeof photo === "string"); // existing photos are URLs

    const formData = new FormData();
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("category", category);

    // Append new photos to FormData
    newPhotos.forEach((photo) => formData.append("newPhotos", photo));

    // Append existing photos as a JSON string
    formData.append("existingPhotos", JSON.stringify(existingPhotos));

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    try {
      const res = await updateProduct({ id, formData }).unwrap();
      console.log("Response:", res);
      if (res.success) {
        setShow(false);
        toast.success("Product updated successfully");
        // setTitle("");
        // setPhotos("");
        // setCategory("");
        // setPrice("");
        // setQty("");
        // setDescription("");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    return () => {
      imgPreviews.forEach((preview) => {
        if (preview.isNew) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [imgPreviews]);
  return (
    <div className="form-area">
      <span className="" onClick={handleShow}>
        <AiOutlineEdit />
      </span>

      {show && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] min-h-full overflow-y-scroll">
          <div className="relative w-11/12 lg:w-1/2 top-24 bottom-0 mx-auto max-w-2xl min-h-full">
            <div className="relative bg-white dark:bg-slate-700 dark:text-zinc-50 rounded-lg shadow">
              <div className="flex items-start justify-between px-8 py-4 border-b rounded">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">
                  Edit Product
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleProductEdit(product._id);
                  }}
                  // console.log(title, body);
                  // props.updatePostHandler(title, body);
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
                    onChange={setDescription}
                    // onEditorChangeText={(e) => setBody(e.target.value)}
                  />

                  <div className="mb-3" controlId="exampleForm.ControlInput1">
                    <input
                      className="dash-input-field w-full p-2 border rounded"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter Price"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      className="dash-input-field w-full p-2 border rounded"
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      placeholder="Enter Quantity"
                    />
                  </div>

                  <div className="mb-3">
                    <select
                      id="role"
                      value={category}
                      className="w-full p-3 border rounded dash-input-field"
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
                          photos.length > 1 ? "border py-2" : ""
                        } flex mt-2`}
                      >
                        {imgPreviews?.map((photo, index) => (
                          <div
                            className="relative"
                            key={index}
                            data-index={index}
                            // draggable
                            // onDragStart={(event) =>
                            //   handleDragStart(index, event)
                            // }
                          >
                            <img
                              key={index}
                              src={photo.url}
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
                  <div className="flex justify-end items-center mt-10 py-10 space-x-2  border-gray rounded-b">
                    <button
                      variant="secondary"
                      onClick={handleClose}
                      className="text-sm bg-red-500 text-white p-3 rounded"
                    >
                      Close
                    </button>
                    <button
                      id="edit-modal"
                      className="p-3 text-sm rounded dark:bg-primary-orange bg-primary-green text-white "
                    >
                      Update
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

export default EditProduct;
