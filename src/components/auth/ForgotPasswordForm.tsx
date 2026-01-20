"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/utils/toast";
import React from "react";
import { supabase } from "@/integrations/supabase/client";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSwitchToSignIn: () => void;
}

export function ForgotPasswordForm({ onSwitchToSignIn }: ForgotPasswordFormProps) {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    const { email } = values;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?type=password_reset`, // Redirect back to auth page after reset
    });

    if (error) {
      showError(error.message);
      console.error("Forgot Password Error:", error.message);
    } else {
      showSuccess("If an account exists, a password reset link has been sent to your email.");
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email address below and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm text-center text-muted-foreground">
        Remember your password?{" "}
        <a href="#" onClick={onSwitchToSignIn} className="text-primary hover:underline ml-1">
          Sign In
        </a>
      </CardFooter>
    </Card>
  );
}