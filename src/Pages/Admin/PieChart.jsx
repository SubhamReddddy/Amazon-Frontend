import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Admin/NavBar";
import { useGetPieChartMutation } from "../../Redux/Api/AdminApi";
import toast from "react-hot-toast";
import { PieChartComponent } from "../../Components/Admin/PieChartComponent";
import Loading from "../../Components/Loader/Loading";

const PieChart = () => {
  const [getPieChart, { isLoading }] = useGetPieChartMutation();
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
      const response = await getPieChart();
      if (response.data) {
        setData(response.data.pieChartData);
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
        <h1 className=" text-3xl font-bold px-6 py-5 font-header">Pie Chart</h1>
        {data.orderstatus && (
          <div className="flex flex-col gap-10">
            {/* pieChat 1 */}
            <div className="bg-[#fff] shadow-productcard rounded-md h-fit">
              <h1 className="font-header text-center text-xl font-semibold text-slate-800 py-3 uppercase">
                Shipping Status
              </h1>
              <div className="flex justify-center">
                <div className="w-[400px] p-5">
                  <PieChartComponent
                    key={windowWidth}
                    labels={data.orderstatus.status}
                    chartData={data.orderstatus.statusCount}
                    offset={[40, 5, 10, 15]}
                  />
                </div>
              </div>
            </div>

            {/* pieChat 2 */}
            <div className="bg-[#fff] shadow-productcard rounded-md h-fit">
              <h1 className="font-header text-center text-xl font-semibold text-slate-800 py-3 uppercase">
                transaction & revenue
              </h1>
              <div className="flex justify-center">
                <div className="w-[400px] p-5">
                  <PieChartComponent
                    key={windowWidth}
                    labels={data.RevenueStatus.lableData}
                    chartData={data.RevenueStatus.revenueArray}
                    bgColor={[
                      "rgba(255, 99, 71, 0.2)",
                      "rgba(0, 128, 0, 0.2)",
                      "rgba(0, 0, 255, 0.2)",
                    ]}
                    boColor={[
                      "rgba(255, 99, 71, 1)",
                      "rgba(0, 128, 0, 1)",
                      "rgba(0, 0, 255, 1)",
                    ]}
                    offset={[10, 70, 20]}
                  />
                </div>
              </div>
            </div>
            {/* pieChat 3 */}
            <div className="bg-[#fff] shadow-productcard rounded-md h-fit">
              <h1 className="font-header text-center text-xl font-semibold text-slate-800 py-3 uppercase">
                in stock & out of stock
              </h1>
              <div className="flex justify-center">
                <div className="w-[400px] p-5">
                  <PieChartComponent
                    key={windowWidth}
                    labels={data.stockStatus.stock}
                    chartData={data.stockStatus.stockCount}
                    bgColor={[
                      "rgba(60, 179, 113, 0.2)",
                      "rgba(138, 43, 226, 0.2)",
                    ]}
                    boColor={["rgba(60, 179, 113, 1)", "rgba(138, 43, 226, 1)"]}
                    offset={(0, 30)}
                  />
                </div>
              </div>
            </div>
            {/* pieChat 4 */}
            <div className="bg-[#fff] shadow-productcard rounded-md h-fit">
              <h1 className="font-header text-center text-xl font-semibold text-slate-800 py-3 uppercase">
                Admin & user
              </h1>
              <div className="flex justify-center">
                <div className="w-[400px] p-5">
                  <PieChartComponent
                    key={windowWidth}
                    labels={data.useradminStatus.lableData}
                    chartData={data.useradminStatus.userArray}
                    bgColor={[
                      "rgba(95, 158, 160, 0.2)",
                      "rgba(0, 255, 127, 0.2)",
                    ]}
                    boColor={["rgba(95, 158, 160, 1)", "rgba(0, 255, 127, 1)"]}
                    offset={[30, 0]}
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

export default PieChart;
