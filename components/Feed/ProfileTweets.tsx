"use client";

type Props = {};

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const ProfileTweets = (props: Props) => {
  const { user } = useUser();
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const response = await fetch("/api/get-tweets");
    const { data } = await response.json();
    setTweets(data);
  };

  useEffect(() => {
    getTweets();
  }, []);

  function getTimeDifference(tweetCreatedAt: any) {
    const now = new Date().valueOf();
    const tweetDate = new Date(tweetCreatedAt).valueOf();

    const timeDifferenceInSeconds = Math.floor((now - tweetDate) / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds ago`;
    } else if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes} minutes ago`;
    } else if (timeDifferenceInHours < 24) {
      return `${timeDifferenceInHours} hours ago`;
    } else {
      return `${timeDifferenceInDays} days ago`;
    }
  }

  return (
    <div className="overflow-y-scroll h">
      {tweets.map((tweet: any) => (
        <div key={tweet.id} className="flex flex-col border-b-2 p-4 ">
          <div className="flex flex-row">
            <div className="static">
              <Image
                width={40}
                height={40}
                className="rounded-full  mr-6"
                src={user?.imageUrl || ""}
                alt="profile picture"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <h1 className="font-bold mr-2">{user?.firstName}</h1>
                    <p className="text-muted-foreground">
                      @{user?.username} · {getTimeDifference(tweet.createdAt)}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{tweet.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileTweets;
