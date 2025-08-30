import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import { headers } from "next/headers";
import SignOutButton from "@/components/auth/signout-button";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Home</h1>

      {session ? (
        <div>
          <p className="py-3">Hello {session.user?.name}</p>
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
    </div>
  );
}
