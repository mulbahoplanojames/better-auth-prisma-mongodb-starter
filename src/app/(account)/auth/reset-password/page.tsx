import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import Link from "next/link";
import React from "react";

interface ResetPasswordPageProps {
  searchParams: { token: string };
}

export default async function ResetPasswordSuccessPage({
  searchParams,
}: ResetPasswordPageProps) {
  const token = (await searchParams).token;
  //   console.log(token);
  return (
    <>
      <div className="px-8 py-16 container mx-auto max-w-screen-md space-y-8 flex justify-center items-center">
        <ResetPasswordForm token={token} />
      </div>
    </>
  );
}
