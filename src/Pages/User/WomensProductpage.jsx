import React, { useEffect, useState } from "react";
import { useWomensProductMutation } from "../../Redux/Api/AdminApi";
import ProductCard from "../../Components/Product/ProductCard";
import { noProduct } from "../../assets/imagePath";
import Loading from "../../Components/Loader/Loading";
import { Link } from "react-router-dom";

const WomensProductpage = () => {
  const [WomensProduct, { isLoading }] = useWomensProductMutation();
  const [data, setdata] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const res = await WomensProduct();
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
        <h1 className="text-3xl font-header mb-5">Women's Fashion</h1>
      </div>
      {isLoading && <Loading />}
      {data?.length > 0 ? (
        <div className="grid grid-cols-2 phoneLarge:grid-cols-3 tabletMedium:grid-cols-4 laptopmin:grid-cols-5 gap-5 mx-5 mb-2">
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

export default WomensProductpage;
