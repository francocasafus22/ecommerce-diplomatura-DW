import { isAxiosError } from "axios";
import api from "../config/axios"

export async function login(formData){
    try {
        const { data } = await api.post("/user/login", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUser(){
    try {
        const { data } = await api.get("/user");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

