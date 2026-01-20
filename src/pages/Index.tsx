import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/SessionContext";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const Index = () => {
  const { user } = useSession();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError(error.message);
      console.error("Sign Out Error:", error.message);
    } else {
      showSuccess("Signed out successfully!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Welcome, {user?.email || "Authenticated User"}!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-prose">
        You are now signed in. This is your main application page.
      </p>
      <Button size="lg" onClick={handleSignOut}>
        Sign Out
      </Button>
      <MadeWithDyad />
    </div>
  );
};

export default Index;