import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Authentication with Better Auth",
  description: "Authentication with Next.js, Prisma, MongoDB and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="antialiased min-h-screen w-full flex-1 p-4 flex justify-center items-center">
      {children}
    </main>
  );
}
