"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgetPassword } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Please enter a valid email.",
  }),
});

export const ForgotPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    const { email } = values;
    if (!email) return toast.error("Please enter your email.");
    await forgetPassword({
      email,
      redirectTo: "/auth/reset-password/",
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
          toast.success("Reset password email sent successfully.");
          router.push("/auth/forgot-password/success");
        },
      },
    });
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <h1 className="text-2xl font-bold">Forget Password</h1>
        <p className="text-muted-foreground">
          Please enter your email address.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter your email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your email address to reset your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Sending..." : "Send Reset Password Email"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
