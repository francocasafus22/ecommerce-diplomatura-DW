import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pen } from "lucide-react";
import InputForm, { TagsInput, TextAreaInput } from "../ui/InputForm";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/services/postServices";
import { toast } from "react-toastify";
import { newNoteSchema } from "@/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";


export default function NewNoteForm({open, setOpen}) {
    const { register, handleSubmit, setValue, formState: {errors}, reset } = useForm({resolver: zodResolver(newNoteSchema)});    

    const { mutate, isPending } = useMutation({
      mutationFn: createPost,
      
      onSuccess: (data) => {
        toast.success(data.message);
        reset();
        setOpen(false);        
      },
      onError: (error) => {
        toast.error(error.message)
      },
    });

    const onSubmit = (data) => {         
        mutate(data)
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className={"cursor-pointer"} variant={"default"} size={"sm"}>
            <Pen />
            Write
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
                <DialogTitle>Write a new note</DialogTitle>
                <DialogDescription>
                Write your note here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
                <InputForm
                label={"Title"}
                name={"title"}
                required
                placeholder={"Enter the title"}
                register={register}
                error={errors.title?.message}
                />
                <InputForm
                label={"Description"}
                name={"description"}
                required
                placeholder={"Enter the description"}
                register={register}
                error={errors.description?.message}
                />
                <TextAreaInput
                label={"Content (Support Markdown)"}
                name={"body"}
                required
                placeholder={"Write your note here"}
                register={register}
                error={errors.body?.message}
                />
                <TagsInput
                label={"Tags"}
                name={"tags"}
                placeholder={"Add your tags and press Enter"}
                register={register}
                setValue={setValue}
                error={errors.tags?.message}
                ></TagsInput>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Note</Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    );
}
