import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Admin/NavBar";
import Loading from "../../Components/Loader/Loading";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import {
  useDeleteUserMutation,
  useGetAllUsersMutation,
} from "../../Redux/Api/AdminApi";
import { avatar } from "../../assets/imagePath";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

const AdminUserPage = () => {
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();
  const [deleteUser, { isLoading: Load }] = useDeleteUserMutation();

  // pagination part
  const contentsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [endingPage, setEndingPage] = useState(0);
  const [contents, setContents] = useState(null);
  const [render, setRender] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await getAllUsers();
      const data = res.data;
      if (res.error) {
        toast.error(res.error.data.message);
      }
      if (data) {
        setEndingPage(Math.ceil(data.user.length / contentsPerPage));
        if (currentPage === 0) {
          setContents(
            data.user.slice(
              currentPage * contentsPerPage,
              currentPage + contentsPerPage
            )
          );
        } else if (currentPage === endingPage - 1) {
          setContents(
            data.user.slice(currentPage * contentsPerPage, data.user.length)
          );
        } else {
          setContents(
            data.user.slice(
              currentPage * contentsPerPage,
              (currentPage + 1) * contentsPerPage
            )
          );
        }
      }
    })();
  }, [currentPage, render]);

  const paginationFunction = (value) => {
    setCurrentPage(currentPage + value);
  };

  const deleteUserFun = async (id) => {
    const res = await deleteUser(id);

    if (res.data) {
      toast.success(res.data.message);
      setRender(!render);
    } else {
      toast.error(res.error.data.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex bg-white relativ">
      {(isLoading || Load) && <Loading />}
      <NavBar />
      {contents && (
        <div className="w-full min-h-screen p-5 flex flex-col ">
          <h1 className=" text-3xl font-bold px-6 py-5 font-header ml-0 tabletSmall:ml-60 mb-5">
            Users
          </h1>
          <div className="ml-0 tabletSmall:ml-60 mb-5 bg-white pb-5 px-5 border-b border-gray-400 grid grid grid-cols-[30%,50%,10%]  phoneMedium:grid-cols-[10%,30%,10%,20%,20%]  place-items-center gap-3 text-xs phoneLarge:text-sm font-header font-semibold">
            <span>Photo</span>
            <span>Name</span>
            <span>Role</span>
            <span className="hidden phoneMedium:block">Manage</span>
            <span className="hidden phoneMedium:block">Delete</span>
          </div>
          <div className="flex-grow">
            {contents ? (
              contents.map((items, idx) => (
                <div
                  key={idx}
                  className="ml-0 tabletSmall:ml-60 mb-5 bg-white pb-5 px-5 border-b border-gray-400 grid grid-cols-[30%,50%,10%]  phoneMedium:grid-cols-[10%,30%,10%,20%,20%] place-items-center gap-3 text-xs phoneLarge:text-sm font-bottom font-medium"
                >
                  {/* image */}
                  <div className="flex flex-grow">
                    <img
                      src={items.avtar.url || avatar}
                      alt="product image"
                      className="w-14 min-w-14 aspect-square object-contain rounded-full"
                    />
                  </div>
                  {/* name */}
                  <span className="text-center">
                    {items.username.substring(0, 30)}
                  </span>
                  {/* role */}
                  <span>{items.role}</span>

                  <span className="block phoneMedium:hidden"></span>
                  {/* manage */}
                  <Link
                    to={
                      items.role === "admin"
                        ? "/admin/customers"
                        : `/admin/customers/${items._id}`
                    }
                    className="bg-blue-500/40 rounded-lg overflow-hidden py-1 px-2 text-blue-800"
                    onClick={() => {
                      if (items.role === "admin") {
                        toast.error("you can't update an admin's account!");
                      }
                    }}
                  >
                    Manage
                  </Link>
                  {/* delete */}
                  <button
                    onClick={() => {
                      deleteUserFun(items._id);
                    }}
                    disabled={items.role === "admin"}
                    className="bg-red-500/50 rounded-lg overflow-hidden py-1 px-2 text-red-800 disabled:bg-gray-400/50 disabled:text-gray-500"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <Loading />
            )}
          </div>

          <div className="ml-0 tabletSmall:ml-60 flex gap-5 justify-center items-center">
            <Button
              variant="contained"
              size="small"
              startIcon={<ChevronLeftIcon />}
              disabled={currentPage === 0}
              onClick={() => {
                paginationFunction(-1);
              }}
            >
              Prev
            </Button>
            <span> {`${currentPage + 1} of ${endingPage}`}</span>
            <Button
              variant="contained"
              size="small"
              endIcon={<ChevronRightIcon />}
              disabled={endingPage - 1 === currentPage || endingPage === 0}
              onClick={() => {
                paginationFunction(1);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserPage;
