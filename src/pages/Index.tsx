import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Welcome to your App!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-prose">
        This is your main application page. To access authentication forms, please click the button below.
      </p>
      <Link to="/auth">
        <Button size="lg">Go to Auth Page</Button>
      </Link>
      <MadeWithDyad />
    </div>
  );
};

export default Index;