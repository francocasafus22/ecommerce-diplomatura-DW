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
import InputForm from "../ui/InputForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editProfileImage } from "@/services/userService";
import { Edit } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileImageSchema } from "@/schemas/userSchema";
import Loading from "../ui/Loading";

export default function EditProfileImageForm({ open, setOpen, image }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(editProfileImageSchema) });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editProfileImage,

    onSuccess: async (data) => {
      toast.success(data.message);
      reset();
      await queryClient.invalidateQueries(["userProfile"]);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data.image[0]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full h-full group">
          <img
            src={image || "/logo-placeholder.jpg"}
            className="w-24 h-24 rounded-full border border-border group-hover:brightness-50  group-hover:shadow-2xl transition-all duration-200 cursor-pointer "
          />

          <Edit
            className="absolute top-5 bottom-5 right-5 left-5 m-5 text-white opacity-0
                                group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Change your profile image</DialogTitle>
            <DialogDescription>
              Upload an image here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <InputForm
              label={"Profile Image"}
              name={"image"}
              placeholder={"Enter your image"}
              register={register}
              type={"file"}
              error={errors.image?.message}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isPending ? <Loading /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
