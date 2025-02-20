import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
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
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
