import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUser } from "../services/userService";
import api from "../config/axios";

export const AuthContext = createContext()

export function AuthProvider({children}){
    const navigate = useNavigate()
    const queryClint = useQueryClient();

    const {data: user, isLoading, isError, refetch, error} = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        refetchOnWindowFocus: false,
        retry: 1
    })

    const logout = async () => {
        const {data} = await api.post("/user/logout");
        queryClint.removeQueries(["user"]);
        toast.success(data.message)
        navigate("/login")
    }

    return(
        <AuthContext.Provider
        value={{user,isLoading, isError, refetch, error, logout}}>
            {children}
        </AuthContext.Provider>
    )
}