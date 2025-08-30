import SignOutButton from "@/components/auth/signout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold pb-6">Profile</h1>
        <p className="pb-6">Hello {session?.user?.name}</p>

        <Link href="/" className="underline py-4 block">
          Home
        </Link>
        <SignOutButton />

        {session && (
          <pre className="mt-6"> {JSON.stringify(session, null, 2)}</pre>
        )}
      </div>
    </>
  );
}
