import api from "@/config/axios";
import { isAxiosError } from "axios";

export async function getCommentsByPost({ postId }) {
  try {
    const { data } = await api.get(`/comment/${postId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addComment({ postId, formData }) {
  try {
    const { data } = await api.post(`/comment/${postId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function editComment({ commentId, formData }) {
  try {
    const { data } = await api.put(`/comment/${commentId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteComment({ commentId }) {
  try {
    const { data } = await api.delete(`/comment/${commentId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
