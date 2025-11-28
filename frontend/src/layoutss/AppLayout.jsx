import { Outlet, useNavigate } from "react-router-dom";
import ToastNotifications from "../components/ui/ToastNotifications";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/ui/Loading"
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export default function AppLayout() {
    const { user, isLoading, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
        if (!user) navigate("/login"); // Redireccionar si no está logeado
        }
    }, [user, navigate, isLoading]);

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <Loading/>
        </div>
        );
    }

    if(!user) return null

    return (
        <>  <div className="flex flex-col min-h-screen">
            <Navbar user={user} logout={logout}/>                 
            <main className="flex-1">
                <Outlet context={user}/>   
            </main>         
            <Footer/>
            <ToastNotifications />        
            </div>
        </>
    );
}
