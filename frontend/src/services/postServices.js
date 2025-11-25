import { isAxiosError } from "axios";

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