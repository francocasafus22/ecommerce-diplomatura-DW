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
import { UserPenIcon } from "lucide-react";
import InputForm from "../ui/InputForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfile } from "@/services/userService";
import { editProfileSchema } from "@/schemas/userSchema";
import { useEffect } from "react";
import Loading from "../ui/Loading";
import { useNavigate } from "react-router-dom";

export default function EditProfileForm({ open, setOpen, user }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(editProfileSchema) });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editProfile,

    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      queryClient.invalidateQueries(["userProfile"]);
      navigate(`/${data.username}`);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (open && user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      });
    }
  }, [user, reset, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"cursor-pointer"} variant={"secondary"} size={"sm"}>
          <UserPenIcon />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Edit your personal data</DialogTitle>
            <DialogDescription>
              Edit your data here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <InputForm
              label={"First name"}
              name={"firstName"}
              required
              placeholder={"Enter your name"}
              register={register}
              error={errors.firstName?.message}
            />
            <InputForm
              label={"Last name"}
              name={"lastName"}
              required
              placeholder={"Enter the last name"}
              register={register}
              error={errors.lastName?.message}
            />
            <InputForm
              label={"Username"}
              name={"username"}
              required
              placeholder={"Enter the username"}
              register={register}
              error={errors.username?.message}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isPending ? (
                <Loading
                  color="border-white"
                  className={"w-4! h-4! border-2!"}
                />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
