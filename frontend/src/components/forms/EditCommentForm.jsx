import { Edit } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Loading from "../ui/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import InputForm from "../ui/InputForm";
import { editComment } from "@/services/commentService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function EditCommentForm({ open, setOpen, comment }) {
  const queryClient = useQueryClient();
  const { slug } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: editComment,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries(["comments", slug]);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { register, handleSubmit } = useForm({ defaultValues: comment });

  const onSubmit = (data) => {
    mutate({ commentId: comment._id, formData: data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(!open)}
        className="absolute right-5 top-0 m-2 hover:text-destructive transition-all duration-200"
      >
        <Edit size={18} />
      </button>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>Edit your comment</DialogTitle>
            <DialogDescription>Modify your comment and save.</DialogDescription>
          </DialogHeader>
          <InputForm
            name={"body"}
            id={"body"}
            placeholder={"Enter your comment"}
            register={register}
            label={"Comment"}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type={"submit"}>
              {isPending ? (
                <Loading
                  color="border-white"
                  className={"w-4! h-4! border-2!"}
                />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
