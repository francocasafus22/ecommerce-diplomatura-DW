import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import AppLayout from "./layoutss/AppLayout.jsx"
import AuthLayout from "./layoutss/AuthLayout.jsx"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import PublicLayout from "./layoutss/PublicLayout.jsx"
import NotePage from "./pages/NotePage"
import ExplorePage from "./pages/ExplorePage"

export default function Router(){
    return(         
        <Routes>
            <Route element={<AppLayout/>}>
                
                <Route path="/:username" element={<ProfilePage/>}></Route>                
            </Route>
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
            </Route>
            <Route element={<PublicLayout/>}>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/note/:slug" element={<NotePage/>}></Route>
                <Route path="/explore" element={<ExplorePage/>}></Route>
            </Route>
        </Routes>              
    )
}