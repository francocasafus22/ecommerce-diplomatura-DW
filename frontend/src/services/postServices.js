import { isAxiosError } from "axios";
import api from "@/config/axios";

export async function getAllUserPosts (username){
    try{
        const {data} = await api.get(`/post/user/${username}`);
        return data         
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function createPost (formData){
    try{
        const {data} = await api.post("/post", formData);
        return data         
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getOneBySlug({slug}){
    try {        
        const {data} = await api.get(`/post/${slug}`);
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}