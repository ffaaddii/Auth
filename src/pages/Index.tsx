import { MadeWithDyad } from "@/components/made-with-dyad";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SignInForm } from "@/components/auth/SignInForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Authentication Forms</h1>
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
        <SignUpForm />
        <SignInForm />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;