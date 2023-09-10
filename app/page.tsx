import Image from "next/image";

import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Link href="/sign-in">
        <Button>Login</Button>
      </Link>
      <Link href="/sign-up">
        <Button>Register</Button>
      </Link>
    </main>
  );
}
