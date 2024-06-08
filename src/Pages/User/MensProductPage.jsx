import React, { useEffect, useState } from "react";
import { useMensProductMutation } from "../../Redux/Api/AdminApi";
import { noProduct } from "../../assets/imagePath";
import ProductCard from "../../Components/Product/ProductCard";
import Loading from "../../Components/Loader/Loading";
import { Link } from "react-router-dom";

const MensProductPage = () => {
  const [MensProduct, { isLoading }] = useMensProductMutation();
  const [data, setdata] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const res = await MensProduct();
      if (res.data) {
        setdata(res.data.products);
      } else {
        toast.error(res.error.data.message);
      }
    })();
  }, []);
  return (
    <div className="mt-36 h-fit w-full overflow-hidden phoneLarge:mt-24">
      <div className="pt-5 pl-[5%]">
        <h1 className="text-3xl font-header mb-5">Men's Fashion</h1>
      </div>
      {isLoading && <Loading />}
      {data?.length > 0 ? (
        <div className="grid grid-cols-1 phoneMedium:grid-cols-2 phoneLarge:grid-cols-3 tabletMedium:grid-cols-4 laptopmin:grid-cols-5 gap-5 mx-5 mb-2">
          {data.map((items, idx) => (
            <Link key={idx} to={`/product/${items._id}`}>
              <ProductCard productes={items} />
            </Link>
          ))}
        </div>
      ) : (
        <img src={noProduct} alt="no product" />
      )}
    </div>
  );
};

export default MensProductPage;
