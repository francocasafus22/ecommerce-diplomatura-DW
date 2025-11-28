import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export default function HomePage() {
    const {user} = useAuth()
  return (
    <div className="flex mt-20 flex-col items-center justify-center h-full px-5">
      <h1 className="text-7xl md:text-8xl font-extrabold mb-6 text-center">
        Notitas
      </h1>
      <p className="text-3xl text-center mb-4 text-gray-700">
        Write your ideas and share with the world
      </p>
      <p className="text-lg  text-center text-gray-500 max-w-xl mb-5">
        Organize your notes, create posts, and connect with others. Notitas is your space to 
        capture thoughts, ideas, and inspiration in one place.
      </p>
      <div className="flex gap-2">
        <Button><Link to={user? `/${user.username}` : "/login"}>Write</Link></Button>
        <Button variant={"secondary"}><Link to={`/explore`}>Explore</Link></Button>
      </div>
    </div>
  );
}
