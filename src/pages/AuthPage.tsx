"use client";

import React, { useState, useEffect } from "react";
import { SignInForm } from "@/components/auth/SignInForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { useSession } from "@/contexts/SessionContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showSuccess } from "@/utils/toast";

type AuthFormType = "signIn" | "forgotPassword";

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState<AuthFormType>("signIn");
  const { session, isLoading } = useSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isLoading && session) {
      navigate('/'); // Redirect authenticated users to the main page
    }
  }, [session, isLoading, navigate]);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'password_reset') {
      showSuccess("Password reset link sent! Please check your email.");
      // Optionally clear the search param after showing the toast
      // navigate('/auth', { replace: true });
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading authentication...</p>
      </div>
    );
  }

  const renderForm = () => {
    switch (currentForm) {
      case "signIn":
        return (
          <SignInForm
            onSwitchToSignUp={() => { /* Sign-up is admin-only, this prop is no longer used for public access */ }}
            onSwitchToForgotPassword={() => setCurrentForm("forgotPassword")}
          />
        );
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