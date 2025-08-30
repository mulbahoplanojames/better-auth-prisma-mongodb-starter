"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendVerificationEmail } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendVerificationEmailSchema } from "@/schema/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SendVerificationEmailForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof sendVerificationEmailSchema>>({
    resolver: zodResolver(sendVerificationEmailSchema),
  });

  async function onSubmit(values: z.infer<typeof sendVerificationEmailSchema>) {
    // console.log(values);
    const { email } = values;

    if (!email) return toast.error("Please enter your email.");

    await sendVerificationEmail({
      email,
      callbackURL: "/auth/verify-email",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx: { error: Error }) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Verification email sent successfully.");
          router.push("/auth/verify-email/success");
        },
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Resend Verification Email</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Resend Verification Email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
