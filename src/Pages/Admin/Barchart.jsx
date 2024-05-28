import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Admin/NavBar";
import { useGetStatsMutation } from "../../Redux/Api/AdminApi";
import toast from "react-hot-toast";
import { Chart } from "../../Components/Admin/Chart";
import Loading from "../../Components/Loader/Loading";

const Barchat = () => {
  const [getStats, { isLoading }] = useGetStatsMutation();
  const [data, setData] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    (async () => {
      const response = await getStats();
      if (response.data) {
        setData(response.data.chartData);
      } else {
        toast.error(response.error.data.message);
      }
    })();
  }, []);

  return (
    <div className="h-full min-h-screen bg-gray-700 flex">
      <NavBar />
      {isLoading && <Loading />}
      {/* stats */}

      <div className="h-screen px-5 pb-10 ml-0 tabletSmall:ml-60 bg-white/90 w-full overflow-auto">
        {/* header */}
        <h1 className=" text-3xl font-bold px-6 py-5 font-header">Bar Chart</h1>
        {data.totalUsers && (
          <div className="flex flex-col gap-10">
            {/* barChat 1 */}
            <div className="bg-[#fff] shadow-productcard rounded-md h-fit">
              <h1 className="font-header text-center text-xl font-semibold text-slate-800 py-3 uppercase">
                transaction & revenue
              </h1>
              <div className="p-5">
                <Chart
                  key={windowWidth}
                  data1={data.barChart.totals}
                  data2={data.barChart.rev}
                  title1={"transaction"}
                  title2={"revenue"}
                  labels={data.barChart.months}
                />
              </div>
            </div>

            {/* barchart 2 */}
            <div className="bg-[#fff] shadow-productcard rounded-md h-fit">
              <h1 className="font-header text-center text-xl font-semibold text-slate-800 py-3 px-5 uppercase">
                Total Numbers of Orders Throughout the Year
              </h1>
              <div className="p-5">
                <Chart
                  key={windowWidth}
                  data1={data.oneYearBarChart.ordersarray}
                  title1={"Orders"}
                  labels={data.oneYearBarChart.Yearsarray}
                  horizontal={true}
                  bgcolor1={"rgba(0, 255, 0, 0.5)"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Barchat;
