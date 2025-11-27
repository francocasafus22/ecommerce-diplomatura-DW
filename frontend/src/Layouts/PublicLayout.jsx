import useAuth from "@/hooks/useAuth";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import ToastNotifications from "../components/ui/ToastNotifications";


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
        <>  <Navbar user={user} logout={logout}/>     
            <Outlet context={user} />
            <ToastNotifications />
        </>
    );
}
