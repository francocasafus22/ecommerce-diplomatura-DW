import useAuth from "@/hooks/useAuth";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import ToastNotifications from "../components/ui/ToastNotifications";
import Footer from "@/components/Footer";


export default function PublicLayout() {
    const { user, isLoading, logout } = useAuth();

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <Loading/>
        </div>
        );
    }

    return (
        <> 
            <div className="flex flex-col min-h-screen">
            <Navbar user={user} logout={logout}/>                 
            <main className="flex-1">
                <Outlet context={user} />
            </main>
            <Footer/>
            <ToastNotifications />
            </div>
        </>
    );
}
