"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const [isPending, setIsPending] = React.useState(false);

  const router = useRouter();

  async function handleSignOut() {
    setIsPending(true);
    await signOut({
      fetchOptions: {
        onError: (context) => {
          toast.error(context.error?.message ?? "Something went wrong");
        },
        onSuccess: () => {
          toast.success("You have been signed out");
          router.push("/");
        },
      },
    });
    setIsPending(false);
  }
  return (
    <Button
      onClick={handleSignOut}
      variant="destructive"
      className="cursor-pointer"
      disabled={isPending}
    >
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
