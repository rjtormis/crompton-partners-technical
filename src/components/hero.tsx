import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { Button } from "./ui/button";
import { Session } from "next-auth";
function Hero({ session }: { session?: Session | null }) {
  return (
    <header className="flex justify-between items-center p-2 shadow-md">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="Logo" className="w-[60px] h-[60px]" />
        <p className="text-xl font-semibold">Palm Sunset</p>
      </div>

      <nav>
        <ul className="flex gap-6">
          <li>
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </li>
          <li>
            <Link href="/listings">
              <Button variant="ghost">Listings</Button>
            </Link>
          </li>
          <li>
            {session ? (
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Hero;
