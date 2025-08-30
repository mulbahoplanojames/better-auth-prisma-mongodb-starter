import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Home</h1>

      <div className="flex gap-6 py-4">
        <Link href="/auth/register" className="underline">
          Register
        </Link>
        <Link href="/auth/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
}
