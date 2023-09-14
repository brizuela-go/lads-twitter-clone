import { prisma } from "@/lib/prismaClient";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { tweetId, externalId } = await req.json();

  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
  });

  if (!tweet) {
    return NextResponse.json({ message: "Tweet not found" }, { status: 404 });
  }

  const like = await prisma.likes.findFirst({
    where: {
      tweetId: tweetId,
      userId: externalId,
    },
  });

  await prisma.likes.delete({
    where: {
      id: like!.id,
    },
  });

  await prisma.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      likeCount: {
        decrement: 1,
      },
    },
  });

  return NextResponse.json({ message: "Liked tweet" });
}
