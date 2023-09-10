import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId } = auth();
  const { content } = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await prisma.tweet.create({
    data: {
      content: content as string,
      user: {
        connect: {
          externalId: userId,
        },
      },
    },
  });

  return NextResponse.json({ data });
}

export async function GET() {
  return NextResponse.json({ data: "Hello World" });
}
