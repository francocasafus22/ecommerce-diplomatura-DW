import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default function Footer() {
    return (
        <footer className="w-full bg-primary text-primary-foreground py-10 mt-20">
        <div className="px-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        
            <div className="flex gap-2">
                <Badge variant={"secondary"} className={"p-0.5"}>
                    <Avatar className={"h-6 w-6"}>
                    <AvatarImage src="/logo-notitas.png" alt="Notitas logo"></AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </Badge>
            <span className="text-xl font-bold">Notitas</span>
            </div>
        
            <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} - Notitas 
            </div>

        </div>
        </footer>
    );
}
