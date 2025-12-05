import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import InputForm from "@/components/ui/InputForm.jsx";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/services/commentService";
import { toast } from "react-toastify";

export default function AddCommentForm({ postId, slug, user }) {
  const { register, handleSubmit, watch, reset } = useForm();

  const body = watch("body");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: async (data) => {
      toast.success(data.message);

      await queryClient.invalidateQueries(["comments", slug]);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate({ postId, formData: data });
  };

  return (
    <form
      className="flex space-x-2 bg-secondary rounded-lg p-5 text-secondary-foreground gap-2 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Avatar className={"h-10 w-10"}>
        <AvatarImage
          src={user.image || "/logo-placeholder.jpg"}
          alt={user.username}
        ></AvatarImage>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <InputForm
        name={"body"}
        placeholder={"Enter your comment"}
        register={register}
        className={"w-full"}
      />
      <Button
        className={"hover:shadow-xl cursor-pointer"}
        disabled={!body}
        type={"submit"}
      >
        Send
      </Button>
    </form>
  );
}
