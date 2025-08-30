import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Authentication with Better Auth",
  description: "Authentication with Next.js, Prisma, MongoDB and Tailwind CSS",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased min-h-screen w-full flex flex-col ">
      <Navbar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
