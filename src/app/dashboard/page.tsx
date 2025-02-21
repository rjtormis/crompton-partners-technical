import DashboardListing from "@/components/dashboard/dashboard-listing";
import Overview from "@/components/overview";
import React from "react";

function page() {
  return (
    <div className="h-full flex flex-col">
      <div>
        <h1>Dashboard</h1>
      </div>

      <Overview />
      <DashboardListing />
    </div>
  );
}

export default page;
