"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
interface SignInOauthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
}

export const SignInOauthButton = ({
  provider,
  signUp,
}: SignInOauthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);

    await signIn.social(
      {
        provider,
        callbackURL: "/profile",
        errorCallbackURL: "/auth/login/error",
      },
      {
        onSuccess: () => {
          setIsPending(false);
        },
        onError: (context: any) => {
          setIsPending(false);
          toast.error(context.error?.message ?? "Something went wrong");
        },
      }
    );
  }

  const action = signUp ? "Register" : "Login";

  const icon = provider === "google" ? <FcGoogle /> : <FaGithub />;
  const providerName = provider === "google" ? "Google" : "GitHub";

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full flex items-center gap-2"
      onClick={handleClick}
      disabled={isPending}
    >
      {icon}
      {action} with {providerName}
    </Button>
  );
};
