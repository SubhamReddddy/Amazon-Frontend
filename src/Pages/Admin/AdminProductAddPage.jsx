import React, { useState } from "react";
import Button from "@mui/material/Button";
import Loading from "../../Components/Loader/Loading";
import { useAddProductMutation } from "../../Redux/Api/UserApi";
import toast from "react-hot-toast";
import NavBar from "../../Components/Admin/NavBar";
import { useNavigate } from "react-router-dom";
const AdminProductAddPage = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDiscription, setProductDiscription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCategories, setProductCategories] = useState("Laptop");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [addProduct, { isLoading }] = useAddProductMutation();

  const categories = [
    "Attire",
    "Bottom",
    "Camera",
    "Earbuds",
    "Earphone",
    "Footwear",
    "Laptop",
    "Jewellery",
    "kitchen accessories",
    "SmartPhones",
    "Tops",
    "Watch",
  ];

  const createProductSubmitHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("productName", productName);
    myForm.set("productDiscription", productDiscription);
    myForm.set("productPrice", productPrice);
    myForm.set("productStock", productStock);
    myForm.set("productCategories", productCategories);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    if (images.length > 0) {
      const res = await addProduct(myForm);
      if (res.data) {
        toast.success(res.data.message);
        navigate("/admin/products");
      } else {
        toast.error(res.error.data.message);
      }
    } else {
      toast.error("Please select a product image");
    }
  };

  const createProductImagesChange = (e) => {
    let abored = false;
    const files = Array.from(e.target.files);

    if (files.length < 2) {
      toast.error("Please select atleast 2 images");
      abored = true;
      return;
    }

    files.forEach((file) => {
      if (file.size > 200000) {
        toast.error("Image size should be less than 200kb");
        abored = true;
        return;
      }
    });

    if (abored) {
      setImages([]);
      setImagesPreview([]);
      return;
    }

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-gray-700">
      <NavBar />
      <div className="h-fit w-full bg-white/90  overflow-hidden py-5 px-1 tabletSmall:flex justify-center">
        <div className="ml-0 tabletSmall:ml-60 w-full tabletSmall:w-[30rem] h-full bg-[#fff] flex flex-col justify-center items-center rounded-md overflow-hidden">
          {isLoading && <Loading />}
          <h1 className="w-full text-3xl font-bold px-6 py-5 font-header">
            Add a new Product
          </h1>
          <form
            onSubmit={createProductSubmitHandler}
            className="w-full bg-[#fff] flex flex-col gap-5 px-6 pb-5"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="Product Name" className="ml-1">
                Product Name
              </label>
              <input
                type="text"
                className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="Description" className="ml-1">
                Description
              </label>
              <input
                type="text"
                className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
                value={productDiscription}
                onChange={(e) => {
                  setProductDiscription(e.target.value);
                }}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="Price" className="ml-1">
                Price
              </label>
              <input
                type="number"
                className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
                min={1}
                value={productPrice}
                onChange={(e) => {
                  setProductPrice(e.target.value);
                }}
                required
              />
            </div>

            <div className="w-full gap-2 flex">
              <div className="flex flex-col gap-1 flex-grow">
                <label htmlFor="Stock" className="ml-1">
                  Stock
                </label>
                <input
                  type="number"
                  className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none w-full"
                  min={0}
                  value={productStock}
                  onChange={(e) => {
                    setProductStock(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="categories" className="ml-1">
                  categories
                </label>
                <select
                  value={productCategories}
                  onChange={(e) => setProductCategories(e.target.value)}
                  className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="Images"
                className="ml-1 cursor-pointer w-full flex flex-col items-center"
              >
                <div>Upload Product Images</div>
                <img
                  src="https://img.freepik.com/free-vector/image-upload-concept-illustration_114360-996.jpg?t=st=1715183623~exp=1715187223~hmac=98c4a800e82d6b1b27b0a70367d093baf0c15bec4a180aac1d6a777357223bce&w=740"
                  alt="add image"
                  className="w-32"
                />
              </label>
              <input
                type="file"
                id="Images"
                name="Image"
                className="hidden"
                multiple
                onChange={createProductImagesChange}
              />
              <div className="flex gap-5 overflow-x-auto">
                {imagesPreview[0] &&
                  imagesPreview.map((item, index) => (
                    <img
                      src={item}
                      alt="new Image"
                      className="h-52 shadow-productcard"
                      key={index}
                    />
                  ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              size="small"
              style={{
                backgroundColor: "#ffdf00",
                color: "ButtonText",
                width: "10rem",
                height: "2.5rem",
                fontWeight: "normal",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              Add Product
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductAddPage;
