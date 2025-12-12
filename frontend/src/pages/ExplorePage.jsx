import NoteCard from "@/components/NoteCard";
import Loading from "@/components/ui/Loading";
import { getAllPosts } from "@/services/postServices";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ExplorePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", currentPage, lastSearch],
    queryFn: () => getAllPosts(search, currentPage),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (search === lastSearch) return;
    setCurrentPage(1);
    setLastSearch(search);
  };

  if (isLoading) return <Loading screen />;
  if (isError) return <p>{error}</p>;

  return (
    <>
      <div className="max-w-5xl mx-auto px-5 xl:px-0 my-5 space-y-10">
        <h1 className="text-5xl font-bold">Explore</h1>
        <form
          className="flex w-full items-center gap-2"
          onSubmit={(e) => onSubmit(e)}
        >
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search note by title"
          />
          <Button className="cursor-pointer" type="submit">
            Search
          </Button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 ">
          {data.posts.length != 0 ? (
            data.posts.map((post) => (
              <NoteCard post={post} key={post._id} canLike />
            ))
          ) : (
            <p>No notes found</p>
          )}
        </div>

        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
