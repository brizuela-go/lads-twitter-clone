import { prisma } from "@/lib/prismaClient";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

const Profile = async (props: Props) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      userId: props.params.id,
    },
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
    <div>
      {tweets.map((tweet) => (
        <div key={tweet.id} className="flex flex-col border-b-2 p-4">
          <div className="flex flex-row">
            <Image
              width={48}
              height={48}
              className="rounded-full  mr-4"
              src={tweet?.user?.attributes?.image_url}
              alt=""
            />
            <div className="flex flex-col">
              <div className="flex flex-row">
                <p className="font-bold">{`${tweet?.user?.attributes?.first_name} ${tweet.user.attributes?.last_name} `}</p>
                <p className="text-gray-500 ml-2">{`@${tweet?.user?.attributes?.username}`}</p>
                <p className="text-gray-500 ml-2">
                  {getTimeDifference(tweet?.createdAt)}
                </p>
              </div>
              <p className="text-gray-500">{tweet?.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
