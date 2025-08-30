import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import { headers } from "next/headers";
import SignOutButton from "@/components/auth/signout-button";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  return (
    <>
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold pt-10">HomeGYP</h1>

        <Button asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </div>
    </>
  );
}
