import { BackgroundDots } from "./components/ui/BackgroundDots";
import Navi from "./components/navi";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/sonner";

export default function Layout() {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <BackgroundDots />
            {isAuthenticated ?
                <SidebarProvider>
                    <AppSidebar />
                    <div className="relative w-full flex flex-col gap-6 justify-center">
                        <Navi />
                        <Outlet />
                        <Toaster />
                    </div>
                </SidebarProvider>
                :
                <>
                    <Navi />
                    <div className="relative container mx-auto flex flex-col gap-6 justify-center items-center">
                        <Outlet />
                    </div>
                    
                </>
            }
        </>
    )
}