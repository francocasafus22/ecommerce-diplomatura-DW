import { useState } from "react";
import { LogOut} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";

export default function Navbar({user, logout}) {

    const location = useLocation()
    const isActive = (path) => location.pathname === path ? "bg-primary text-primary-foreground" : "text-primary"
    const navigate = useNavigate()

    return (
        <nav className="flex items-center justify-between px-6 py-3">
        
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
                <img src="/logo-notitas.png" className="w-10 " onClick={()=>navigate("/")}/>            
            </div>
        </div>
        <ul className="hidden md:flex md:gap-1">
            <Link to={"/"} className={`hover:bg-primary py-2 px-5 rounded-xl hover:text-primary-foreground cursor-pointer transition-colors duration-200 ${isActive("/")}`}>Home</Link>
            <Link to={"/explore"} className={`hover:bg-primary py-2 px-5 rounded-xl hover:text-primary-foreground cursor-pointer transition-colors duration-200 ${isActive("/explore")}`}>Explore</Link>
            
        </ul>
                    
            {user ? <DropdownMenu>
            <DropdownMenuTrigger className="outline-none"><img src={user.image || "https://i.pinimg.com/736x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg"} className="w-12 rounded-full cursor-pointer hover:shadow-2xl transition-all duration-300"></img></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem><Link to={`/`} className="w-full">Home</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to={`/explore`} className="w-full">Explore</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to={`/${user.username}`} className="w-full">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem><button onClick={async ()=>{await logout()}}>Log out</button></DropdownMenuItem>   

                          
            </DropdownMenuContent>
            </DropdownMenu> : <Button onClick={()=>navigate("/login")}>Log in</Button>}
        
        </nav>
    );
}
