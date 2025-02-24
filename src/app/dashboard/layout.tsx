import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palm Sunset | Dashboard",
};
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/login");
  } else {
    return (
      <SidebarProvider open={false}>
        <AppSidebar />
        <SidebarInset className="flex">
          {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto mr-4">
          <ThemeToggle />
        </div>
      </header> */}
          {/* <Outlet /> */}
          <div className="p-4 flex-grow">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }
}
