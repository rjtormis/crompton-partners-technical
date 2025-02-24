import DashboardListing from "@/components/dashboard/dashboard-listing";
import Overview from "@/components/overview";
import React from "react";
import { prisma } from "../api/auth/[...nextauth]/options";

async function page() {
  const totalProperties = await prisma.property.count();
  return (
    <div className="h-full flex flex-col">
      <div>
        <h1>Dashboard</h1>
      </div>

      <Overview />
      <DashboardListing totalProperties={totalProperties} />
    </div>
  );
}

export default page;
