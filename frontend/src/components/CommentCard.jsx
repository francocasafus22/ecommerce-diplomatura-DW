import { Edit, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
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
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/services/commentService";
import { toast } from "react-toastify";
import Loading from "./ui/Loading";
import EditCommentForm from "./forms/EditCommentForm";

export default function CommentCard({ comment, slug }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (data) => {
      toast.success(data.message);
      setOpenDelete(false);
      await queryClient.invalidateQueries(["comments", slug]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div
      className="flex space-x-2 bg-secondary rounded-lg p-5 text-secondary-foreground gap-2 relative"
      key={comment._id}
    >
      {comment.isOwner && (
        <>
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <button
                onClick={() => {}}
                className="absolute right-0 top-0 m-2 hover:text-destructive transition-all duration-200"
              >
                <X size={18} />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete this comment?</DialogTitle>
                <DialogDescription>
                  This action can&apos;t be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    mutate({ commentId: comment._id });
                  }}
                >
                  {isPending ? (
                    <Loading
                      color="border-white"
                      className={"w-4! h-4! border-2!"}
                    />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <EditCommentForm
            open={openEdit}
            setOpen={setOpenEdit}
            comment={comment}
          />
        </>
      )}
      <Avatar className={"h-10 w-10"}>
        <AvatarImage
          src={comment.authorAvatar || "/logo-placeholder.jpg"}
          alt={comment.authorName}
        ></AvatarImage>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold">@{comment.authorName}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p>{comment.body}</p>
      </div>
    </div>
  );
}
