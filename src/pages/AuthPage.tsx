"use client";

import React, { useState } from "react";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { MadeWithDyad } from "@/components/made-with-dyad";

type AuthFormType = "signIn" | "signUp" | "forgotPassword";

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState<AuthFormType>("signIn");

  const renderForm = () => {
    switch (currentForm) {
      case "signIn":
        return (
          <SignInForm
            onSwitchToSignUp={() => setCurrentForm("signUp")}
            onSwitchToForgotPassword={() => setCurrentForm("forgotPassword")}
          />
        );
      case "signUp":
        return <SignUpForm onSwitchToSignIn={() => setCurrentForm("signIn")} />;
      case "forgotPassword":
        return <ForgotPasswordForm onSwitchToSignIn={() => setCurrentForm("signIn")} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      {renderForm()}
      <MadeWithDyad />
    </div>
  );
};

export default AuthPage;