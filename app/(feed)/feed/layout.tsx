import Sidebar from "@/components/Feed/Sidebar";
import WhoToFollow from "@/components/Feed/WhoToFollow";
import Header from "@/components/Header";
import { UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Feed",
  description: "Your Feed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="px-52">
          <Sidebar />

          <Header />
          <div className="ml-[16em] fixed  h-screen w-[35em] mt-20 border-t-2">
            {children}
          </div>

          <WhoToFollow />
        </div>
      </body>
    </html>
  );
}
