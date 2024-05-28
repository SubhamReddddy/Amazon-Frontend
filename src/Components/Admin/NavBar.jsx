import React, { useEffect, useState } from "react";
import { logo2 } from "../../assets/imagePath";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [value, setValue] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    if (windowWidth > 870) setValue(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  const controllersArray = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "/admin/dashboard",
    },
    {
      name: "Customers",
      icon: <GroupIcon />,
      link: "/admin/customers",
      link2: "/admin/customers",
    },
    {
      name: "Products",
      icon: <CategoryIcon />,
      link: "/admin/products",
      link2: "/admin/products",
      link3: "/admin/product/add",
    },
    {
      name: "Orders",
      icon: <BorderAllIcon />,
      link: "/admin/orders",
      link2: "/admin/orders",
      link4: "/admin/orders",
    },
  ];

  const ChatArray = [
    {
      name: "BarChart",
      icon: <BarChartIcon />,
      link: "/admin/barchart",
    },
    {
      name: "PieChart",
      icon: <PieChartIcon />,
      link: "/admin/piechart",
    },
    {
      name: "LineChart",
      icon: <TimelineIcon />,
      link: "/admin/linechart",
    },
  ];
  return (
    <div>
      <div
        onClick={() => {
          setValue(!value);
        }}
        className="fixed left-1 block tabletSmall:hidden cursor-pointer"
      >
        <MenuIcon fontSize="large" />
      </div>

      <motion.div
        initial={
          windowWidth > 870 ? { x: 0, opacity: 1 } : { x: -240, opacity: 1 }
        }
        animate={
          windowWidth > 870 || value
            ? { x: 0, opacity: 1 }
            : { x: -240, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
        className="h-screen w-[240px] bg-[#fff] shadow-productcard z-20 p-5 fixed left-0 top-0"
      >
        <Link
          to={"/"}
          className="h-20 border-2 border-transparent flex justify-center hover:border-black"
        >
          <img src={logo2} alt={logo2} />
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="font-header">Controllers</h1>
          {controllersArray.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="rounded-lg p-2 mx-2 flex gap-2 cursor-pointer items-center"
              style={{
                backgroundColor:
                  item.link === location.pathname ||
                  item.link3 === location.pathname ||
                  item.link2 ===
                    location.pathname.substring(
                      0,
                      location.pathname.length - 25
                    ) ||
                  item.link4 ===
                    location.pathname.substring(
                      0,
                      location.pathname.length - 50
                    )
                    ? "#93c5fd99"
                    : "#fff",
              }}
            >
              <div className="flex justify-center items-center">
                {item.icon}
              </div>
              <p className="font-bottom">{item.name}</p>
            </Link>
          ))}

          <h1 className="font-header">Chats</h1>
          {ChatArray.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="rounded-lg p-2 mx-2 flex gap-2 cursor-pointer items-center"
              style={{
                backgroundColor:
                  item.link === location.pathname ? "#93c5fd99" : "#fff",
              }}
            >
              <div className="flex justify-center items-center">
                {item.icon}
              </div>
              <p className="font-bottom">{item.name}</p>
            </Link>
          ))}
        </div>
      </motion.div>

      {value && (
        <div
          className="w-screen h-screen fixed top-0 left-0 bg-black/30 z-10"
          onClick={() => {
            setValue(!value);
          }}
        ></div>
      )}
    </div>
  );
};

export default NavBar;
