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
        <div className="xl:px-52">
          <Sidebar />

          <Header />
          <div className="xl:ml-[16em] xl:fixed  h-screen xl:w-[35em] xl:mt-20 mt-6 border-t-2">
            {children}
          </div>

          <WhoToFollow />
        </div>
      </body>
    </html>
  );
}
