const allCategories = [
  "All",
  "Attire",
  "Bottom",
  "Camera",
  "Earbuds",
  "Earphone",
  "Footwear",
  "Laptop",
  "Jewellery",
  "kitchen accessories",
  "SmartPhones",
  "Tops",
  "Watch",
];

const sideBarList = [
  {
    heading: "Trending",
    data: ["Best Sellers", "New Releases"],
    link: ["/product/category/bestsellers", "/product/category/newreleases"],
  },
  {
    heading: "Shop by Category",
    data: ["Men's Fashion", "Women's Fashion"],
    link: ["/product/category/mensfashion", "/product/category/womensfashion"],
  },
  {
    heading: "Digital Content and Devices",
    data: [
      "Echo & Alexa",
      "Fire TV",
      "Kindle E-Readers & eBooks",
      "Audible Audiobooks",
      "Amazon Prime Video",
      "Amazon Prime Music",
    ],
    link: [
      "/servicecomingsoon",
      "/servicecomingsoon",
      "/servicecomingsoon",
      "/servicecomingsoon",
      "/servicecomingsoon",
      "/servicecomingsoon",
    ],
  },
  {
    heading: "Programs & Features",
    data: [
      "Amazon Pay",
      "Gift Cards & Mobile Recharges",
      "Amazon Launchpad",
      "Handloom and Handicrafts",
    ],
    link: [
      "/servicecomingsoon",
      "/servicecomingsoon",
      "/servicecomingsoon",
      "/servicecomingsoon",
    ],
  },
];

export { allCategories, sideBarList };
