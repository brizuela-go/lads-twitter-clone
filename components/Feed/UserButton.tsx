"use clent";

import React from "react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/clerk-react";

type Props = {};

const UserButton = (props: Props) => {
  const { openUserProfile } = useClerk();
  return (
    <Button
      onClick={() => openUserProfile()}
      size={"lg"}
      className="absolute top-60 right-5 "
    >
      Edit
    </Button>
  );
};

export default UserButton;
