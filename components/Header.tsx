"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import ModeToggle from "./ModeToggle";

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
    <div className="xl:ml-[18em] xl:fixed xl:border-r-2 xl:h-screen xl:w-[33em]">
      <div className="max-xl:flex max-xl:justify-evenly px-5 max-xl:items-center">
        <TwitterLogoIcon className="w-10 h-10 xl:hidden mt-5 " />
        <h1 className=" mt-5 text-3xl font-bold w-full max-xl:text-center  ">
          {routes.find((route) => route.path === pathname)?.name}
        </h1>
        <div className="xl:hidden mt-5">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
