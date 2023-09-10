"use client";

import React from "react";
import { usePathname } from "next/navigation";

type Props = {};

const routes = [
  {
    name: "Home",
    path: "/feed",
  },
  {
    name: "Profile",
    path: "/feed/profile",
  },
];

const Header = (props: Props) => {
  const pathname = usePathname();
  return (
    <div className="ml-[18em] fixed border-r-2 h-screen w-[33em]">
      <h1 className=" mt-5 text-3xl font-bold w-full  ">
        {routes.find((route) => route.path === pathname)?.name}
      </h1>
    </div>
  );
};

export default Header;
