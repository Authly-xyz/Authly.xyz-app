import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  return (
    <div className="container mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl lg:text-2xl">
            Welcome to the Authly!
          </CardTitle>
          <CardDescription>
            Authly is an authentication provider for your React app. It provides
            a simple and secure way to manage user authentication and
            authorization.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button className="w-full" variant={"outline"}>
            <FcGoogle className="mr-2 size-5" />
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-foreground/80 text-[12px]">
            Verified Authentication with OAuth.2
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
