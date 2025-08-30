import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const SuccessRegisterPage: React.FC = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="size-28 bg-green-500 rounded-full mx-auto mb-2 flex justify-center items-center">
          <Check className="size-18 text-white" />
        </div>
        <CardTitle className="md:text-2xl text-lg text-center">
          Registration Successful
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Please check your email for verification link.
        </p>

        <p className="text-center">
          If you don&apos;t receive the email, check your spam folder.
        </p>

        <Button
          asChild
          className="w-full mt-6 bg-green-500 hover:bg-green-600 disabled:bg-green-400"
        >
          <Link href="/auth/login" className="text-center text-lg">
            Ok
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuccessRegisterPage;
