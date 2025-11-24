import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import AppLayout from "./layouts/AppLayout"
import AuthLayout from "./layouts/AuthLayout"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import RegisterPage from "./pages/RegisterPage"


export default function Router(){
    return(         
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<HomePage/>}></Route>
            </Route>
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
            </Route>
        </Routes>              
    )
}