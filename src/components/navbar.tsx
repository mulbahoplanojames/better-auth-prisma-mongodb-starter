import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import SignOutButton from "./auth/signout-button";
import { headers } from "next/headers";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="py-2 px-10 flex justify-between items-center  shadow-xl">
      <h1 className="text-xl font-bold">Logo</h1>
      <ul className="flex gap-4 space-x-7">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
      {session ? (
        <div>
          <SignOutButton />
        </div>
      ) : (
        <>
          <div className="flex gap-6 py-4">
            <Link href="/auth/login" className="underline">
              Login
            </Link>
            <Link href="/auth/register" className="underline">
              Register
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
