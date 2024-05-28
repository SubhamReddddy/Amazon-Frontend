import {
  orderBox,
  location,
  contactUs,
  userEdit,
} from "../../assets/imagePath";
export const userAccountdata = [
  {
    image: orderBox,
    link: "/me/account/orders",
    header: "Your Orders",
    body: "Track, return, or buy again",
  },
  {
    image: userEdit,
    link: "/me/account/profile",
    header: "security",
    body: "Edit name, and mobile number",
  },
  {
    image: location,
    link: "/me/account/address",
    header: "Your Addresses",
    body: "Edit addresses for orders",
  },
  {
    image: contactUs,
    link: "",
    header: "Contact Us",
    body: "Contact With Us",
  },
];
