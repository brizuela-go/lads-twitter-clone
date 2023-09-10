import { prisma } from "@/lib/prismaClient";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const WhoToFollow = async (props: Props) => {
  const users = await prisma.user.findMany({
    take: 3,
  });

  console.log(users);

  return (
    <div className="ml-[51em] w-72 fixed ">
      <Card className="m-6">
        <CardHeader>
          <CardTitle className="text-center">Who to follow</CardTitle>
        </CardHeader>
        <CardContent>
          {users.map((user: any, i: number) => (
            <div
              key={i}
              className="flex flex-row items-center justify-between "
            >
              <div className="flex flex-row items-center space-y-6">
                <Image
                  width={40}
                  height={40}
                  className="rounded-full"
                  src={user.attributes?.image_url}
                  alt={user.attributes?.first_name}
                />
                <div className="ml-2">
                  <p className="font-bold">
                    {user.attributes?.first_name} {user.attributes?.last_name}
                  </p>
                  <p className="text-muted-foreground">
                    @{user.attributes?.username}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WhoToFollow;
