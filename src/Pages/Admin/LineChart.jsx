import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Admin/NavBar";
import { useGetStatsMutation } from "../../Redux/Api/AdminApi";
import toast from "react-hot-toast";
import { Chart } from "../../Components/Admin/Chart";
import { LineChartComponent } from "../../Components/Admin/LineChartComponent";
import Loading from "../../Components/Loader/Loading";

const LineChart = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="h-full min-h-screen bg-gray-700 flex">
      <NavBar />
      {isLoading && <Loading />}
      {/* stats */}
      <div className="h-screen px-5 pb-10 ml-0 tabletSmall:ml-60 bg-white/90 w-full overflow-auto">
        {data.totalUsers && (
          <div>
            {/* header */}
            <h1 className=" text-3xl font-bold px-6 py-5 font-header">
              Line Chart
            </h1>
            <div className="flex flex-col gap-10">
              {/* barchart 2 */}
              <div className="bg-[#fff] shadow-productcard rounded-md h-fit">
                <h1 className="font-header text-center text-xl font-semibold text-slate-800 py-3 px-5 uppercase">
                  Last Six Month's Revenue
                </h1>
                <div className="p-5">
                  <LineChartComponent
                    title="Revenue"
                    chatData={data.barChart.rev}
                    lables={data.barChart.months}
                    bgColor={"rgb(255, 99, 132)"}
                    bdColor={"rgba(255, 99, 132, 0.5)"}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;
