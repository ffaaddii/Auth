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

const signUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(50, { message: "Password must not exceed 50 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // This onSubmit function will not be called from the public AuthPage
  // It's kept here in case an admin panel uses it.
  function onSubmit(values: SignUpFormValues) {
    console.log("Admin-initiated Sign Up Form submitted:", values);
    showSuccess("User created successfully by administrator! (Check console for data)");
    // In a real admin panel, you'd handle API calls here to create a user via Supabase admin client
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up (Admin Only)</CardTitle>
        <CardDescription>
          This form is for administrators to create new user accounts.
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create User
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm text-center text-muted-foreground">
        <a href="#" onClick={onSwitchToSignIn} className="text-primary hover:underline ml-1">
          Back to Sign In
        </a>
      </CardFooter>
    </Card>
  );
}