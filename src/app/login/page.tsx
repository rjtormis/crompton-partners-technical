import Hero from "@/components/hero";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KeyRound, User } from "lucide-react";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = () => {};
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <div className="flex-grow flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to view dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <Formik initialValues={initialValues} onSubmit={handleLogin}>
              {({ values, handleChange, handleSubmit }) => (
                <Form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex gap-2 ">
                      <User className="w-[24px] h-[24px] my-auto" />
                      <Input id="name" placeholder="Name of your project" />
                    </div>
                    <div className="flex gap-2">
                      <KeyRound className="w-[24px] h-[24px] my-auto" />
                      <Input id="name" placeholder="Name of your project" />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
          <CardFooter className="flex justify-between w-full">
            <Button className="w-full">Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;
