import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import {
  useAddressDetailsMutation,
  useAddressUpdateMutation,
} from "../../Redux/Api/UserApi";
import { Navigate, useParams } from "react-router-dom";
import { checkPinCode } from "../../Features/InputValidator";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../Loader/Loading";
import { useSelector } from "react-redux";
const UserAddressUpdate = () => {
  const { user } = useSelector((State) => State.userSlice);
  const { id } = useParams();
  const [AddressDetails, { isLoading: Load }] = useAddressDetailsMutation();
  const [AddressUpdate, { isLoading }] = useAddressUpdateMutation();
  const [pinCode, setPinCode] = useState("");
  const [DistrictName, setDistrictName] = useState("");
  const [StateName, setStateName] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCodeValid, setPinCodeValid] = useState(false);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.postalpincode.in/pincode/${pinCode}`
        );
        if (
          data[0].Message === "No records found" ||
          data[0].Message === "The requested resource is not found"
        ) {
          setPinCodeValid(false);
        } else {
          setPinCodeValid(true);
          setDistrictName(data[0].PostOffice[0].Division);
          setStateName(data[0].PostOffice[0].State);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (pinCode.length === 6) {
      if (checkPinCode(pinCode)) {
        getData();
      }
    } else {
      const isvalid = checkPinCode(pinCode);
      setPinCodeValid(isvalid);
      setDistrictName("");
      setStateName("");
    }
  }, [pinCode]);

  useEffect(() => {
    const getAddressData = async () => {
      const res = await AddressDetails(id);
      if (res.error) {
        toast.error(res.error.data.message);
      } else if (res.data) {
        // console.log(res.data.address)
        setPinCode(res.data.address.pinCode);
        setFlatNo(res.data.address.flatNo);
        setArea(res.data.address.area);
        setLandmark(res.data.address.landmark);
        setStateName(res.data.address.state);
        setDistrictName(res.data.address.city);
      }
    };

    getAddressData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (pinCodeValid) {
      const res = await AddressUpdate({
        id,
        flatNo,
        area,
        landmark,
        city: DistrictName,
        state: StateName,
        country: "India",
        pinCode,
      });
      if (res.error) {
        toast.error(res.error.data.message);
      } else if (res.data) {
        toast.success(res.data.message);
        setNav(true);
      }
    } else {
      toast.error("Please enter a valid ZIP or postal code.");
    }
  };

  if (!user._id) return <Navigate to={"/signin"} />;
  if (nav) return <Navigate to={"/me/account/address"} />;
  return (
    <div className="w-full tabletSmall:w-[30rem] h-full bg-[#fff] flex flex-col justify-center items-center rounded-md overflow-hidden">
      {(isLoading || Load) && <Loading />}
      <h1 className="w-full text-3xl font-bold px-6 py-5 font-header">
        Update Address
      </h1>
      <form
        onSubmit={submitHandler}
        className="w-full bg-[#fff] flex flex-col gap-5 px-6 pb-5"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="Country/Region" className="ml-1">
            Country/Region
          </label>
          <select
            name="Country/Region"
            id="Country/Region"
            className="h-10 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
            required
          >
            <option value="India">India</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Pincode" className="ml-1">
            Pincode
          </label>
          <input
            type="text"
            maxLength={6}
            className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
            value={pinCode}
            required
            onChange={(e) => {
              setPinCode(e.target.value);
            }}
          />
          {pinCode && (
            <p className="text-xs font-medium text-[#2b2b2b] h-5 flex items-center mt-1">
              {pinCodeValid ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : (
                <CancelIcon color="error" fontSize="small" />
              )}
              {pinCodeValid
                ? "valid ZIP or postal code."
                : "Please enter a valid ZIP or postal code."}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="Flat, House no., Building, Company, Apartment"
            className="ml-1"
          >
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            type="text"
            className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
            value={flatNo}
            onChange={(e) => {
              setFlatNo(e.target.value);
            }}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Area, Street, Sector, Village" className="ml-1">
            Area, Street, Sector, Village
          </label>
          <input
            type="text"
            className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
            }}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Landmark" className="ml-1">
            Landmark
          </label>
          <input
            type="text"
            className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none"
            value={landmark}
            onChange={(e) => {
              setLandmark(e.target.value);
            }}
            required
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="State" className="ml-1">
              State
            </label>
            <input
              type="text"
              value={StateName}
              className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none capitalize"
              required
              onChange={() => {}}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="Town/City" className="ml-1">
              Town/City
            </label>
            <input
              type="text"
              value={DistrictName}
              className="h-10 p-2 rounded-md border border-zinc-300 hover:shadow-inputbox outline-none capitalize"
              required
              onChange={() => {}}
              readOnly
            />
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
          Update Address
        </Button>
      </form>
    </div>
  );
};

export default UserAddressUpdate;
