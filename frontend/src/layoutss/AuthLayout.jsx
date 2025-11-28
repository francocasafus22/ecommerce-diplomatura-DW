import { Outlet } from "react-router-dom";
import ToastNotifications from "../components/ui/ToastNotifications"


export default function AuthLayout(){

    return(
        <>
            <div className=" min-h-screen  flex flex-col items-center justify-center px-10">
                <Outlet/>        
            </div>
            <ToastNotifications/>
        </>
    )
}