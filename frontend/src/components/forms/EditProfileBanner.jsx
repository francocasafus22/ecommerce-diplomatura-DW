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
import { editProfileBanner } from "@/services/userService";
import { Badge } from "../ui/badge";
import { Edit } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileBannerSchema } from "@/schemas/userSchema";
import Loading from "../ui/Loading";

export default function EditProfileBannerForm({ open, setOpen, banner }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(editProfileBannerSchema) });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editProfileBanner,

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
    mutate(data.banner[0]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full h-full group">
          <img
            src={banner}
            className="w-full h-full rounded-xl object-cover bg-primary
                                transition-all duration-200 cursor-pointer group-hover:shadow-2xl"
          />

          <Edit
            className="absolute top-0 right-0 m-5 text-white opacity-0
                                group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Change your profile banner</DialogTitle>
            <DialogDescription>
              Upload an banner here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <InputForm
              label={"Profile banner"}
              name={"banner"}
              placeholder={"Enter your banner"}
              register={register}
              type={"file"}
              error={errors.banner?.message}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isPending ? <Loading
                color="border-white"
                className={"w-4! h-4! border-2!"}
              /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
