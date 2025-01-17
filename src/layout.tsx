import { BackgroundDots } from "./components/ui/BackgroundDots";
import Navi from "./components/navi";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="">
            <BackgroundDots />
            <Navi className="" />
            <main className="relative container mx-auto flex gap-6 justify-center">
                <Outlet />
            </main>
        </div>
    )
}