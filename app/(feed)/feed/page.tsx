import React from "react";
import { prisma } from "@/lib/prismaClient";
import Image from "next/image";

type Props = {};

export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = 10;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5;

const FeedHome = async (props: Props) => {
  const tweets = await prisma.tweet.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  function getTimeDifference(tweetCreatedAt: any) {
    const now = new Date();
    const tweetDate = new Date(tweetCreatedAt);

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
    <div className="overflow-y-scroll h-[660px] ">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="flex flex-col border-b-2 p-4">
          <div className="flex flex-row">
            <div className="static">
              <Image
                width={40}
                height={40}
                className="rounded-full  mr-6"
                src={tweet?.user?.attributes?.image_url}
                alt="profile picture"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <p className="font-bold">{`${tweet?.user?.attributes?.first_name} ${tweet.user.attributes?.last_name} `}</p>
                <p className="text-muted-foreground ml-2">
                  @{tweet.user.attributes?.username}
                </p>
                <p className="text-muted ml-2">
                  {getTimeDifference(tweet.createdAt)}
                </p>
              </div>
              <p>{tweet.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedHome;
