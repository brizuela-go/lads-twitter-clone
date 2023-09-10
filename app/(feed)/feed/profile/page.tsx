"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { CalendarIcon } from "@radix-ui/react-icons";
import UserButton from "@/components/Feed/UserButton";
import ProfileTweets from "@/components/Feed/ProfileTweets";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useUser();

  return (
    <>
      <div>
        <div className="">
          <div className="w-full bg-slate-400 absolute h-56" />
          <div className="relative">
            <Image
              src={user?.imageUrl || ""}
              alt="Profile Picture"
              width={150}
              height={150}
              className="rounded-full border-4 border-black absolute top-40 left-5"
            />
            <UserButton />
          </div>
        </div>
      </div>
      <div className="mt-80 flex flex-col ml-8 space-y-5">
        <h1 className="text-3xl font-bold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className=" text-muted-foreground">@{user?.username}</p>
        <div className="flex flex-wrap text-muted-foreground">
          <CalendarIcon className="w-5 h-5 mr-2" />
          Joined {new Date(user?.createdAt || "").toLocaleDateString()}
        </div>
      </div>
      <ProfileTweets />
    </>
  );
};

export default Profile;
