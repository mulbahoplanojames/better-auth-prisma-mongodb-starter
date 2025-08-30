import Link from "next/link";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <Link href="/auth/login">Back to Login</Link>
        <h1 className="text-3xl font-bold">Success</h1>

        <p className="text-muted-foreground">
          Success! You have re-sent a verification link to your email.
        </p>
      </div>
    </div>
  );
}
