import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Admin/NavBar";
import { useGetStatsMutation } from "../../Redux/Api/AdminApi";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import toast from "react-hot-toast";
import { Chart } from "../../Components/Admin/Chart";
import Loading from "../../Components/Loader/Loading";

const AdminDashboard = () => {
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
  const TopElements = [
    {
      heading: "transactions",
      data1: data.transactionPercentage,
      data2: data.totaltransation,
      color: "#0062FF",
    },
    {
      heading: "users",
      data1: data.userPercentage,
      data2: data.totalUsers,
      color: "#00dddd",
    },
    {
      heading: "products",
      data1: data.productPercentage,
      data2: data.totalProducts,
      color: "#ffaa00",
    },
    {
      heading: "orders",
      data1: data.orderPercentage,
      data2: data.totalOrdersCount,
      color: "#FF00FF",
    },
  ];

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
              Dashboard
            </h1>
            {/* 4 cards */}
            <div className="flex flex-wrap justify-center gap-5 my-5">
              {TopElements.map((element, idx) => (
                <div
                  key={idx}
                  className="bg-[#fff] shadow-productcard rounded-md p-3"
                >
                  <div className="flex gap-3">
                    <div>
                      <h6 className="text-xs">{element.heading}</h6>
                      <div className="text-sm font-bottom font-bold mt-1">
                        {idx === 0 ? `₹${element.data2}` : element.data2}
                      </div>
                      <div className="text-sm">
                        {element.data1 > 0 ? (
                          <TrendingUpIcon color="success" />
                        ) : (
                          <TrendingDownIcon color="error" />
                        )}
                        {element.data1 > 0 ? (
                          <span className="text-green-700">{`+${
                            element.data1 >= 10000 ? 9999 : element.data1
                          }%`}</span>
                        ) : (
                          <span className="text-red-600">{`${
                            element.data1 <= -10000 ? -9999 : element.data1
                          }%`}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div
                        className="h-14 w-14 rounded-full flex justify-center items-center"
                        style={{
                          backgroundImage: `conic-gradient(${
                            element.color
                          } 0deg, ${element.color} ${
                            3.6 * Math.abs(element.data1)
                          }deg,white ${
                            3.6 * Math.abs(element.data1)
                          }deg, white 360deg`,
                        }}
                      >
                        <div
                          className="bg-[#fff] h-12 w-12 rounded-full text-xs flex justify-center items-center"
                          style={{ color: `${element.color}` }}
                        >
                          {element.data1 > 0
                            ? `+${
                                element.data1 >= 10000 ? 9999 : element.data1
                              }%`
                            : `${
                                element.data1 <= -10000 ? -9999 : element.data1
                              }%`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* barchart and inventory*/}
            <div className="w-full flex flex-col phoneLarge:grid tabletSmall:flex tabletMedium:grid grid-cols-[65%,30%] mt-10 gap-10">
              {/* barchart */}
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

              {/* inventory */}
              <div className="w-full bg-[#fff] text-sm shadow-productcard px-5 rounded-md flex flex-col justify-center">
                <h1 className="font-header text-center text-xl font-semibold text-slate-800 py-3">
                  INVENTORY
                </h1>
                <div className="w-full capitalize">
                  {data.productArray.map((items, idx) => (
                    <div key={idx} className="flex flex-col mb-5">
                      {/* product name */}
                      <p className="font-bottom">{items.productName}</p>

                      {/* graph */}
                      <div className="grid grid-cols-[85%,10%] gap-[5%] place-items-center">
                        <div className="bg-[#ddd] h-fit w-full flex items-center rounded-lg overflow-hidden p-[2px] border border-gray-500/20 ">
                          <div
                            className="rounded-lg "
                            style={{
                              backgroundColor: `${items.color}`,
                              width: `${items.value}%`,
                              height: "4px",
                            }}
                          />
                        </div>

                        {/* value */}
                        <div className="font-bottom">{items.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
