import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Loading from "../../Components/Loader/Loading";
import NavBar from "../../Components/Admin/NavBar";
import { avatar } from "../../assets/imagePath";
import {
  useGetSingleUsersMutation,
  useUpdateUserDetailsMutation,
} from "../../Redux/Api/AdminApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const AdminUserManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getSingleUsers, { isLoading: Load }] = useGetSingleUsersMutation();
  const [updateUserDetails, { isLoading }] = useUpdateUserDetailsMutation();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [roleStore, setRoleStore] = useState("user");

  useEffect(() => {
    const func = async () => {
      const res = await getSingleUsers(id);
      setUser(res.data.user);
      setRole(res.data.user.role);
      setRoleStore(res.data.user.role);
    };
    func();
  }, [id]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (role === roleStore) {
      toast.error(`is already a ${roleStore}`);
    } else {
      const response = await updateUserDetails({ id, role });
      if (response.error) {
        toast.error(response.error.data.message);
      } else if (response.data) {
        toast.success(response.data.message);
        navigate("/admin/customers");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-700">
      <NavBar />
      {user && (
        <div className="h-fit w-full bg-white/90  overflow-hidden py-5 px-1 tabletSmall:flex justify-center">
          <div className="ml-0 tabletSmall:ml-60 w-full tabletSmall:w-[30rem] h-full bg-[#fff] flex flex-col justify-center items-center rounded-md overflow-hidden">
            {(isLoading || Load) && <Loading />}
            <div className="w-full px-6 py-5 font-header">
              <h1 className="text-3xl font-bold">Manage User</h1>
              <h3 className="text-sm text-red-500">
                Administrators can only update the roles of customers.
              </h3>
            </div>
            <form
              onSubmit={submitHandler}
              className="w-full bg-[#fff] flex flex-col gap-5 px-6 pb-5"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="Product Name" className="ml-1">
                  Name
                </label>
                <input
                  type="text"
                  value={user.username}
                  className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="Description" className="ml-1">
                  Email
                </label>
                <input
                  type="text"
                  value={user.email}
                  className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
                  readOnly
                />
              </div>

              <div className="flex gap-5">
                <div className="flex flex-col gap-1 flex-grow">
                  <label htmlFor="Price" className="ml-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={user.phoneno}
                    className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="Stock" className="ml-1">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="Images" className="ml-1">
                  Profile
                </label>
                <div className="flex justify-center">
                  <div className="rounded-full overflow-hidden h-fit w-fit">
                    <img
                      src={user.avtar.url}
                      alt="profile"
                      className="aspect-square object-contain h-28"
                    />
                  </div>
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
                Update
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManage;
