import MarkdownView from "@/components/MarkdownView";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/Loading";
import { getOneBySlug } from "@/services/postServices";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCommentsByPost } from "../services/commentService.js";
import CommentCard from "@/components/CommentCard.jsx";
import useAuth from "@/hooks/useAuth.jsx";

import { Input } from "@/components/ui/input.jsx";
import AddCommentForm from "@/components/forms/AddCommentForm.jsx";

export default function NotePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["note", slug],
    queryFn: () => getOneBySlug({ slug }),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => getCommentsByPost({ postId: data._id }),
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!data?._id,
  });

  if (isError)
    return (
      <p className="text-primary text-xl font-medium h-[80vh] flex items-center justify-center">
        {error}
      </p>
    );
  if (isLoading) return <Loading screen />;

  return (
    <div className="mx-auto container lg:max-w-3xl xl:max-w-5xl my-10 px-5 lg:px-0 space-y-10">
      <div>
        <h1 className="text-5xl font-bold">{data.title}</h1>
        <p className="text-muted-foreground text-lg my-5">{data.description}</p>
        <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 mb-15">
          <div className="flex gap-2">
            <Badge
              className={
                "flex gap-1 text-sm hover:shadow-xl transition-all duration-200 cursor-pointer"
              }
              onClick={() => {
                navigate(`/${data.authorName}`);
              }}
            >
              <Avatar className={"h-6 w-6"}>
                <AvatarImage
                  src={data.authorAvatar || "/logo-placeholder.jpg"}
                  alt={data.authorName}
                ></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              @{data.authorName}
            </Badge>
            <Badge variant={"secondary"}>
              Created {new Date(data.createdAt).toLocaleDateString()}
            </Badge>
          </div>

          <div className="flex gap-2">
            {data.tags.map((tag) => (
              <Badge variant={"secondary"} key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>{" "}
      </div>

      <MarkdownView content={data.body}></MarkdownView>

      <p className="text-5xl font-bold border-t-2 pt-5 border-border ">
        Comentarios
      </p>

      <div className="space-y-2">
        <>
          {user && <AddCommentForm postId={data._id} slug={slug} user={user} />}
          {isLoadingComments ? (
            <Loading />
          ) : (
            comments.map((comment) => (
              <CommentCard comment={comment} key={comment._id} slug={slug} />
            ))
          )}
          {comments?.length == 0 && (
            <p className="font-semibold text-md mt-5">
              Be the first to comment
            </p>
          )}
        </>
      </div>

      <Link className="flex items-center justify-center mt-10" to={-1}>
        <Button
          className={
            "cursor-pointer hover:shadow-xl transition-all duration-200"
          }
        >
          Volver
        </Button>
      </Link>
    </div>
  );
}
