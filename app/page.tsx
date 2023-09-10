import Image from "next/image";

import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <Link href="/feed">
        <Button>Go to feed</Button>
      </Link>
    </main>
  );
}
