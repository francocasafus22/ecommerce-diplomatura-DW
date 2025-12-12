import { getAllUserPosts } from "@/services/postServices";
import { getProfile } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pen, UserRoundPen } from "lucide-react";
import NewNoteForm from "@/components/forms/NewNoteForm";
import { useState } from "react";
import EditProfileForm from "@/components/forms/EditProfileForm";
import EditProfileImageForm from "@/components/forms/EditProfileImage";
import EditProfileBannerForm from "@/components/forms/EditProfileBanner";
import NoteCard from "@/components/NoteCard";
import Loading from "@/components/ui/Loading";

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditImage, setOpenEditImage] = useState(false);
  const [openEditBanner, setOpenEditBanner] = useState(false);

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => getProfile(username),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: postData, isLoading: postIsLoading } = useQuery({
    queryKey: ["userPosts", username],
    queryFn: () => getAllUserPosts(username),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (userIsError)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-2">
        <p className="text-primary font-light">{userError.message}</p>
        <Button
          className={"cursor-pointer"}
          onClick={() => {
            navigate(-1);
          }}
        >
          Volver
        </Button>
      </div>
    );

  return (
    <>
      <div className="min-h-screen max-w-5xl w-full mx-auto my-5 px-5 xl:px-0 space-y-5">
        {userIsLoading ? (
          <Loading screen />
        ) : (
          <>
            <div className="relative aspect-3/1  mb-25">
              <div
                className="absolute left-1/2 -translate-x-1/2
                    -bottom-16"
              >
                {userData.isOwner ? (
                  <EditProfileImageForm
                    open={openEditImage}
                    setOpen={setOpenEditImage}
                    image={userData.user.image}
                  />
                ) : (
                  <img
                    src={userData.user.image || "/logo-placeholder.jpg"}
                    className="w-24 h-24 rounded-full border border-border "
                  />
                )}
                <p className="text-center font-bold">
                  @{userData.user.username}
                </p>
              </div>

              {userData.isOwner ? (
                <EditProfileBannerForm
                  open={openEditBanner}
                  setOpen={setOpenEditBanner}
                  banner={userData.user.banner}
                />
              ) : (
                <img
                  src={userData.user.banner}
                  className="w-full h-full rounded-xl object-cover bg-primary"
                />
              )}
            </div>

            <div className="flex  justify-between items-end">
              <p className="text-4xl font-bold">Notes</p>
              {userData.isOwner && (
                <div className="flex  gap-2">
                  <EditProfileForm
                    open={openEdit}
                    setOpen={setOpenEdit}
                    user={userData.user}
                  />
                  <NewNoteForm open={open} setOpen={setOpen} />
                </div>
              )}
            </div>

            {postIsLoading ? (
              <p className="text-primary font-medium">Loading notes...</p>
            ) : (
              <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {postData.posts.map((post) => (
                  <NoteCard
                    post={post}
                    key={post._id}
                    canDelete={userData ? userData.isOwner : false}
                  />
                ))}

                {postData.posts.length == 0 && (
                  <p className="text-muted-foreground">No notes found yet</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
