import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useCreateFeaturedMutation } from "../../slices/featuredApiSlice";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

const AddProduct = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [photo, setPhotos] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);

  const [createFeatured] = useCreateFeaturedMutation();

  const handleDragStart = (index, event) => {
    event.dataTransfer.setData("index", index);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const index = event.dataTransfer.getData("index");
    const newIndex = event.target.dataset.index;

    // Create copies of image previews and images
    const updatedPreviews = [...imgPreviews];
    const updatedImages = [...photo];

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
    const updateImages = [...photo];
    updateImages.splice(index, 1);
    setPhotos(updateImages);
  };

  const createFeaturedHandler = async (e) => {
    e.preventDefault();
    if (photo.length === 0) {
      console.error("No images selected.");
      return;
    }

    const formData = new FormData();
    formData.append("url", url);
    formData.append("title", title);

    for (let i = 0; i < photo.length; i++) {
      formData.append("photo", photo[i]);
    }
    try {
      const res = await createFeatured(formData);
      if (res.success === true) {
        setShow(false);
        toast.success("Featured post created successfully");
        setTitle("");
        setPhotos("");
        setUrl("");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="form-area">
      <span className="" onClick={handleShow}>
        <div className="p-2 lg:p3 text-base  dark:bg-primary-orange dark:hover:bg-primary-orange-hover bg-primary-green hover:bg-green-700 text-slate-50 rounded cursor-pointer">
          + Create
        </div>
      </span>

      {show && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] max-h-full overflow-y-scroll">
          <div className="relative mb-28  w-11/12 lg:w-1/2 top-24 bottom-0 mx-auto max-w-2xl max-h-full">
            <div className="relative bg-white dark:bg-slate-700 dark:text-zinc-50 rounded-lg shadow">
              <div className="flex items-start justify-between px-8 py-4 border-b rounded">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">
                  Create Featured Product{" "}
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
                  onSubmit={createFeaturedHandler}
                >
                  <div className="mb-3" controlId="exampleForm.ControlInput1">
                    <input
                      className="w-full p-2 border rounded"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Title"
                    />
                  </div>

                  <div className="mb-3" controlId="exampleForm.ControlInput1">
                    <input
                      className="w-full p-2 border rounded"
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter URL"
                    />
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
