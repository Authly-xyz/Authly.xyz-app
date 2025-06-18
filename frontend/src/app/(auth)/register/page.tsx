import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className="w-full">
      <Card className="mx-auto max-w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-xl lg:text-2xl">
            Authly!
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Welcome to Authly! Please register to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {/* email input and continue button */}
          <div className="flex w-full flex-col gap-4">
            <Label className="text-sm" htmlFor="email">
              Email
            </Label>
            <Input placeholder="example@gmail.com" id="email" />
            <Button className="w-full">Continue with Email</Button>
          </div>
          {/* separator */}
          <div className="flex w-full items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gray-300" />
            <p className="text-muted-foreground text-sm">or continue with</p>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          {/* social login buttons */}
          <Button className="w-full" variant={"outline"}>
            <FaGoogle className="mr-2 size-4" />
            Continue with Google
          </Button>
          <Button className="w-full" variant={"outline"}>
            <FaGithub className="mr-2 size-4" />
            Continue with GitHub
          </Button>
          <Button className="w-full" variant={"outline"}>
            <BsTwitterX className="mr-2 size-4" />
            Continue with Twitter/X
          </Button>
          <Button className="w-full" variant={"outline"}>
            <FaFacebookF className="mr-2 size-4" />
            Continue with Facebook
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-[10px]">
            Verified Authentication with OAuth.2
          </p>
        </CardFooter>
      </Card>
      <div className="text-muted-foreground mx-auto mt-4 max-w-[300px] text-center text-xs text-pretty">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy.
      </div>
    </div>
  );
}
