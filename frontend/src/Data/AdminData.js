import {
  UilEstate,
  UilUsersAlt,
  UilPackage,
  UilUsdSquare,
  UilMoneyWithdrawal,
  UilClipboardAlt,
  UilSignOutAlt,
  UilBuilding,
} from "@iconscout/react-unicons";

export const AdminSidebarData = [
  {
    key: "admin-dashboard",
    icon: UilEstate,
    heading: "Dashboard",
  },
  {
    key: "adminbranches",
    icon: UilBuilding ,
    heading: "Branches",
  },
  {
    key: "adminemployees",
    icon: UilUsersAlt,
    heading: "Employees",
  },
  {
    key: "adminproducts",
    icon: UilPackage,
    heading: "Products",
  },

  {
    key: "",
    icon: UilSignOutAlt,
    heading: "",
  },
];

export const AdminCardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "",
    png: UilUsdSquare,

  },
  
];
