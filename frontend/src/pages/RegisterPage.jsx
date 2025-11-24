import { useMutation } from "@tanstack/react-query";
import InputForm from "../components/ui/InputForm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export default function RegisterPage(){

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {mutate, isPending} = useMutation({
        mutationFn: ()=>{},
        onSuccess: (data)=>{toast.success(data)},
        onError: (error)=>{toast.success(error.message)}
    })

    const handleSubmit = (e) => {
        e.prevent.default()
    }
    return(
        <form
        className=" rounded-xl flex flex-col gap-2 w-full max-w-lg"
        onSubmit={(e) => {
            handleSubmit(e);
        }}
        >
        <div className="flex flex-col-reverse items-center gap-3">
            <p className="text-center text-2xl font-medium">
            Sign up for <span className="bg-linear-to-r font-bold from-celeste-500 via-menta-500 to-accent-500 bg-clip-text text-transparent">Notitas</span>
            </p>

            <img src="logo-notitas.png" alt="Logo Notitas" className="w-18" />
        </div>

        
        <InputForm
            label={"Username"}
            name={"username"}                        
            placeholder={"Enter your username"}
            value={username}
            onChange={(e) => {
                setUsername(e.target.value)
            }}
        />
        
        
        <InputForm
            label={"Email"}
            name={"Email"}
            type={"email"}
            required={true}
            placeholder={"Enter your email"}
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
        />
        
        <InputForm
            label={"Password"}
            name={"Password"}
            type={"password"}
            required={true}
            placeholder={"Enter password"}
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
        ></InputForm>

        <button
            className="
            bg-linear-to-r from-celeste-500 via-menta-500 to-accent-500
            text-warm-500 rounded-lg py-2 mt-2
            shadow-xl transition-all duration-300 cursor-pointer
            hover:brightness-105 
        "
        >
            {isPending ? "Cargando" : "Create account"}
        </button>
        <Link to={"/register"} className="text-sm text-center mt-5 group">
            ¿Already have an account?{" "}
            <span className="bg-linear-to-r from-celeste-500 via-menta-500 to-accent-500 bg-clip-text text-transparent font-bold ">
            Sign in
            </span>
        </Link>
        </form>
    )
}