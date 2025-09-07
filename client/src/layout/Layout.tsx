import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-1 flex-col ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
