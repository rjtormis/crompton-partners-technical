"use client";
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
import { KeyRound, User } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Formik, Form, Field, FieldProps } from "formik";
import { useState } from "react";
import { signIn } from "next-auth/react";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };

  const router = useRouter();

  const handleLogin = async (state: typeof initialValues) => {
    setLoading(true);
    const res = await signIn("credentials", {
      username: state.username,
      password: state.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (res?.status === 401) {
      setLoading(false);
    }

    setLoading(false);

    if (res?.error)
      return toast.error("Invalid credentials", {
        description: (
          <p className="text-black">Invalid login credentials. Please contact support.</p>
        ),
      });
    else {
      return router.push("/dashboard");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {({}) => (
          <Form>
            <Card className="w-[350px]">
              <CardHeader className="text-center">
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to view dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <Field name="username">
                    {({ field }: FieldProps) => (
                      <div className="flex gap-2 ">
                        <User className="w-[24px] h-[24px] my-auto" />
                        <Input {...field} id="name" name="username" placeholder="Username" />
                      </div>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field }: FieldProps) => (
                      <div className="flex gap-2">
                        <KeyRound className="w-[24px] h-[24px] my-auto" />
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                      </div>
                    )}
                  </Field>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between w-full">
                <Button type="submit" className="w-full" disabled={loading}>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
