import { Heart, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import InputForm from "./ui/InputForm";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, likePost } from "@/services/postServices";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Badge } from "./ui/badge";
import useAuth from "@/hooks/useAuth";

export default function NoteCard({ post, canDelete, canLike }) {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(
        z.object({
            password: z.string().min(1, { message: "Password is required" }),
        })
        ),
    });

    const {user} = useAuth()
    
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deletePost,
        onSuccess: async (data) => {
        toast.success(data.message);
        reset();
        await queryClient.invalidateQueries(["userPosts"]);
        setOpen(false);
        },
        onError: (error) => {
        toast.error(error.message);
        },
    });

    const {mutate: mutateLike, isPending : isPendingLike} = useMutation({
        mutationFn: likePost,
        onSuccess: (data) => {
            toast.success(data.message);
            post.likedByUser = data.likedByUser;
            post.likesCount = data.likesCount
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    console.log(post)

    const onSubmit = (data) => {
        mutate({ formData: data, postId: post._id });
    };

    return (
        <div
        className="p-8 rounded-xl border border-border bg-secondary text-secondary-foreground shadow-md hover:shadow-xl relative transition-shadow duration-200 cursor-pointer"
        onClick={() => {
            !open && navigate(`/note/${post.slug}`);
        }}
        key={post.slug}
        >
        <div className="flex flex-col h-full justify-between gap-2">
            {canDelete && (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    }}
                    className="absolute right-0 top-0 m-2 hover:text-destructive transition-all duration-200"
                >
                    <X size={18} />
                </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to delete this note?
                    </DialogTitle>
                    <DialogDescription>
                        This action can&apos;t be undone.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3">
                    <InputForm
                        label={`Password`}
                        name={"password"}
                        required
                        placeholder={"Enter your password"}
                        register={register}
                        error={errors.password?.message}
                    />
                    </div>
                    <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" variant={"destructive"}>
                        Delete
                    </Button>
                    </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>
            )}

            <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <div className="flex-wrap space-x-1 space-y-1">
                {post.tags.map((tag) => (
                <Badge>{tag}</Badge>
                ))}
            </div>
            <p className="text-muted-foreground text-base line-clamp-5">
                {post.description}
            </p>
            </div>

            <div className="flex pt-2  justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <img
                src={post.authorAvatar}
                className="w-8 h-8 rounded-full border border-border object-cover"
            />
                <span className="font-medium">@{post.authorName}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            
           {canLike &&  <Button className={`hover:bg-destructive transition-all duration-300 cursor-pointer ${post.likedByUser && "bg-destructive"}`} onClick={(e) => {
                    e.stopPropagation(); user ? mutateLike(post._id) : navigate("/login")
                    }}><Heart/>{post.likesCount}</Button>}
        
            </div>
        </div>
        </div>
    );
}
