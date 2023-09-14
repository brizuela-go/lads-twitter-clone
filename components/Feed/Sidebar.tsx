"use client";

type Props = {};

import Link from "next/link";
import {
  TwitterLogoIcon,
  HomeIcon,
  PersonIcon,
  ExitIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import ModeToggle from "../ModeToggle";
import { useClerk } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const routes = [
  {
    name: "Home",
    path: "/feed",
    icon: HomeIcon,
  },
  {
    name: "Profile",
    path: "/feed/profile",
    icon: PersonIcon,
  },
];

const Sidebar = (props: Props) => {
  const { signOut } = useClerk();
  const router = useRouter();

  const createTweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("tweet") as string;

    await fetch("/api/tweet", {
      method: "POST",
      body: JSON.stringify({ content }),
    });

    router.refresh();
  };

  return (
    <>
      <nav className=" xl:h-screen xl:fixed xl:w-[16em] xl:border-r-2 p-5 max-xl:hidden">
        <TwitterLogoIcon className="w-10 h-10" />
        <ul className="flex flex-col mt-7 gap-6">
          {routes.map((route) => (
            <li
              className="flex justify-start items-center gap-7 hover:opacity-70 transition duration-200 ease-in-out"
              key={route.path}
            >
              <route.icon className="w-7 h-7 " />
              <Link className="text-xl font-bold" href={route.path}>
                <p>{route.name}</p>
              </Link>
            </li>
          ))}
          <li className="hover:opacity-70 transition duration-200 ease-in-out">
            <button
              className="flex justify-start items-center gap-7"
              onClick={() => signOut()}
            >
              <ExitIcon className="w-7 h-7" />
              <p className="text-xl font-bold">Logout</p>
            </button>
          </li>
        </ul>
        <div className="mt-6">
          <ModeToggle />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-10 w-full">Tweet</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>What&apos;s popping?</DialogTitle>
              <DialogDescription>
                Say your piece and let the world know what&apos;s on your mind.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={createTweet}>
              <Textarea id="tweet" name="tweet" maxLength={40} minLength={3} />

              <DialogFooter>
                <DialogTrigger className="mt-6">
                  <Button type="submit">Tweet</Button>
                </DialogTrigger>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </nav>
      <nav className="xl:hidden border-t-2  fixed bottom-0 bg-zinc-50 dark:bg-zinc-950  w-full h-12">
        <ul className="flex justify-evenly items-center h-full">
          {routes.map((route) => (
            <li
              className="flex justify-start items-center gap-7 hover:opacity-70 transition duration-200 ease-in-out"
              key={route.path}
            >
              <Link className="text-xl font-bold" href={route.path}>
                <route.icon className="w-7 h-7 " />
              </Link>
            </li>
          ))}
          <li className="hover:opacity-70 transition duration-200 ease-in-out">
            <button
              className="flex justify-start items-center gap-7"
              onClick={() => signOut()}
            >
              <ExitIcon className="w-7 h-7" />
            </button>
          </li>
        </ul>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size={"icon"}
              className="fixed bottom-16 right-7 rounded-full"
            >
              <Pencil1Icon className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>What&apos;s popping?</DialogTitle>
              <DialogDescription>
                Say your piece and let the world know what&apos;s on your mind.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={createTweet}>
              <Textarea id="tweet" name="tweet" maxLength={40} minLength={3} />

              <DialogFooter>
                <DialogTrigger className="mt-6">
                  <Button type="submit">Tweet</Button>
                </DialogTrigger>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </nav>
    </>
  );
};

export default Sidebar;
