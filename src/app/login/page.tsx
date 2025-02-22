import Hero from "@/components/hero";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import LoginForm from "@/components/login-form";
import { redirect } from "next/navigation";

async function Login() {
  const session = await getServerSession(options);

  // Check session, if it exists we automatically redirect to the dashboard else we show the login form.
  if (session) {
    return redirect("/dashboard");
  } else {
    return (
      <div className="flex flex-col min-h-screen">
        <Hero />
        <LoginForm />
      </div>
    );
  }
}

export default Login;
