import { SendVerificationEmailForm } from "@/components/auth/send-verification-email-form";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  if (!error) redirect("/");

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-md space-y-4">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
      </div>

      <p className="text-destructive text-center">
        <span className="capitalize">
          {error.replace(/_/g, " ").replace(/-/g, " ")}
        </span>{" "}
        - Please request a new verification email.
      </p>

      <SendVerificationEmailForm />
    </div>
  );
}
