"use client";

import React from "react";
import { Button } from "../ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

type Props = {
  tweetId: number;
  externalId: string;
  likedTweets: number[];
};

const LikeButton = ({ tweetId, externalId, likedTweets }: Props) => {
  const router = useRouter();

  const likeTweet = async () => {
    const response = await fetch("/api/like-tweet", {
      method: "POST",
      body: JSON.stringify({ tweetId, externalId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Something went wrong");
    }

    router.refresh();
  };

  const unlikeTweet = async () => {
    const response = await fetch("/api/unlike", {
      method: "POST",
      body: JSON.stringify({ tweetId, externalId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Something went wrong");
    }

    router.refresh();
  };

  return (
    <div className="">
      {likedTweets.includes(tweetId) ? (
        <Button onClick={unlikeTweet} size={"icon"} variant={"ghost"}>
          <HeartFilledIcon className="w-5 h-5 text-red-500" />
        </Button>
      ) : (
        <Button onClick={likeTweet} size={"icon"} variant={"ghost"}>
          <HeartIcon className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default LikeButton;
