import SignOutButton from "@/components/auth/signout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold pb-6">Profile</h1>
        {session && <p className="pb-6">Hello {session?.user?.name}</p>}

        {session && <SignOutButton />}

        {session && (
          <pre className="mt-6"> {JSON.stringify(session, null, 2)}</pre>
        )}
      </div>
    </>
  );
}
