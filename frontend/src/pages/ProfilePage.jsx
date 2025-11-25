import useAuth from "@/hooks/useAuth";
import {getAllUserPosts} from "@/services/postServices";
import { getProfile } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { Button } from "@/components/ui/button";
import {Pen, UserRoundPen} from "lucide-react"
import NewNoteForm from "@/components/forms/NewNoteForm";

export default function ProfilePage() {
    const { username } = useParams();
    const navigate = useNavigate()

    const {
        data: userData,
        isLoading: userIsLoading,
        isError: userIsError,
        error: userError
    } = useQuery({
        queryKey: ["userProfile"],
        queryFn: () => getProfile(username),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const {
        data: postData,
        isLoading: postIsLoading,
        isError: postIsError,        
    } = useQuery({
        queryKey: ["userPosts"],
        queryFn: () => getAllUserPosts(username),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    if(userIsError) return (<div className="flex flex-col items-center justify-center h-[80vh] gap-2">
        <p className="text-primary font-light">{userError.message}</p>
        <Button className={"cursor-pointer"} onClick={()=>{navigate(-1)}}>Volver</Button>
    </div>)

    const posts = [
        {
        title: "Cómo empezar en programación web en 2025",
        slug: "como-empezar-en-programacion-web-en-2025",
        description:
            "Una guía clara para quienes quieren iniciarse en el desarrollo web moderno.",
        tags: ["web", "javascript", "frontend", "backend"],
        images: ["https://example.com/posts/web2025-banner.jpg"],
        body: `# Empezar en programación web en 2025

        Aprender desarrollo web hoy es más accesible que nunca. Aquí tienes los fundamentos:

        ## 📌 Tecnologías esenciales
        - HTML
        - CSS
        - JavaScript
        - Control de versiones (Git)

        ## 🚀 Primeros pasos
        1. Aprendé la estructura básica de una página HTML.
        2. Dominá Flexbox y Grid en CSS.
        3. Practicá manipulación del DOM.
        4. Empezá a usar \`fetch\` para consumir APIs.

        \`\`\`js
        console.log("Hola, mundo del desarrollo web");
        \`\`\`

        ## 🎯 ¿Qué sigue?
        Aprender un framework moderno como **React** y conceptos de backend.
        `,
        userId: "675b2f0c9d1f2e12ab123456",
        authorName: "FrancoDev",
        authorAvatar: "https://i.pinimg.com/736x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg",
        status: "published",
        likes: [],
        },

        {
        title: "Node.js para principiantes: conceptos que tenés que dominar",
        slug: "node-js-para-principiantes-conceptos-que-tenes-que-dominar",
        description: "Resumen práctico de los conceptos esenciales de Node.js.",
        tags: ["nodejs", "backend", "javascript"],
        images: ["https://example.com/posts/node-basics.jpg"],
        body: `# Node.js para principiantes
        Node.js te permite correr JavaScript en el servidor.

        ## 🌐 Conceptos clave
        - Event Loop
        - Módulos
        - NPM
        - Express
        - Asincronía

        \`\`\`js
        import express from "express";
        const app = express();

        app.get("/", (req, res) => {
        res.send("Servidor funcionando con Node.js!");
        });

        app.listen(3000);
        \`\`\`

        ## 🧠 Conclusión
        Dominar estos conceptos te va a permitir construir tu primera API.
        `,
        userId: "675b2f0c9d1f2e12ab123456",
        authorName: "FrancoDev",
        authorAvatar: "https://i.pinimg.com/736x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg",
        status: "published",
        likes: [],
        },

        {
        title: "MongoDB: cómo estructurar tus colecciones correctamente",
        slug: "mongodb-como-estructurar-tus-colecciones-correctamente",
        description:
            "Buenas prácticas para modelar datos en MongoDB usando Mongoose.",
        tags: ["mongodb", "mongoose", "nosql"],
        images: ["https://example.com/posts/mongodb-design.png"],
        body: `# Diseñar colecciones en MongoDB
        MongoDB es una base de datos NoSQL orientada a documentos.

        ## 📂 Prácticas recomendadas
        - Evitar documentos extremadamente grandes
        - Usar documentos embebidos cuando tiene sentido
        - Utilizar referencias (\`ref\`) para relaciones 1:N
        - Validar con Mongoose

        ### Ejemplo de schema:
        \`\`\`js
        const userSchema = new Schema({
        name: String,
        email: String,
        posts: [{ type: Types.ObjectId, ref: "Post" }]
        });
        \`\`\`

        ## 🔍 Tip final
        Diseñá pensando en las **consultas reales** que hará tu aplicación.
        `,
        userId: "675b2f0c9d1f2e12ab123456",
        authorName: "FrancoDev",
        authorAvatar: "https://i.pinimg.com/736x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg",
        status: "published",
        likes: [],
        },

        {
        title: "Las mejores prácticas para escribir código limpio",
        slug: "las-mejores-practicas-para-escribir-codigo-limpio",
        description:
            "Cómo mejorar la calidad de tu código siguiendo principios simples.",
        tags: ["clean code", "mejores practicas", "calidad de codigo"],
        images: ["https://example.com/posts/clean-code-cover.jpg"],
        body: `# Código limpio: conceptos esenciales
        Escribir código limpio hace tu trabajo más fácil y legible.

        ## 🧹 Principios fundamentales
        - Funciones pequeñas
        - Nombres significativos
        - Evitar duplicación
        - Separación de responsabilidades

        \`\`\`js
        function calculateTotal(items) {
        return items.reduce((acc, item) => acc + item.price, 0);
        }
        \`\`\`

        ## ✔ Conclusión
        Un código limpio siempre paga a largo plazo.
        `,
        userId: "675b2f0c9d1f2e12ab123456",
        authorName: "FrancoDev",
        authorAvatar: "https://i.pinimg.com/736x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg",
        status: "published",
        likes: [],
        },

        {
        title: "React vs Next.js en 2025: ¿cuál conviene aprender?",
        slug: "react-vs-next-js-en-2025-cual-conviene-aprender",
        description:
            "Comparación de tecnologías frontend para nuevos desarrolladores.",
        tags: ["react", "nextjs", "frontend"],
        images: ["https://example.com/posts/react-next-2025.png"],
        body: `# React vs Next.js en 2025
        Ambos siguen siendo tecnologías principales del ecosistema JavaScript.

        ## ⚛ React
        - Librería flexible
        - Manejo total del frontend
        - Requiere configuración adicional

        ## ▲ Next.js
        - Renderizado híbrido (SSR/SSG)
        - Ruteo automático
        - Imágenes optimizadas

        ### Ejemplo en Next.js
        \`\`\`jsx
        export default function Home() {
        return <h1>Hola desde Next.js</h1>;
        }
        \`\`\`

        ## 🧭 ¿Cuál elegir?
        Si querés simplicidad: **React**.  
        Si querés rendimiento y features listas: **Next.js**.
        `,
        userId: "675b2f0c9d1f2e12ab123456",
        authorName: "FrancoDev",
        authorAvatar: "https://i.pinimg.com/736x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg",
        status: "published",
        likes: [],
        },
    ];
    
    return (
        <>
        <div className="min-h-scren max-w-5xl mx-auto my-5 px-5 lg:px-0 space-y-5">
            {userIsLoading ? (
            <p>Cargando...</p>
            ) : (
            <>
                <div className="relative aspect-3/1  mb-25">
                <div
                    className="absolute left-1/2 -translate-x-1/2 
                    -bottom-16"
                >
                    <img
                    src={userData.user.image}
                    className="w-24 h-24 rounded-full border border-border"
                    />
                    <p className="text-center font-bold">
                    @{userData.user.username}
                    </p>
                    
                </div>

                <img
                    src={userData.user.banner}
                    className="w-full h-full rounded-xl object-cover"
                />  
                </div>
                
                
                <div className="flex  justify-between items-end">
                    <p className="text-4xl font-bold">Notes</p>
                    {userData.isOwner && <div className="flex  gap-2">
                        <Button size={"sm"} variant={"outline"}  className="cursor-pointer"><UserRoundPen/> Edit</Button>
                        <NewNoteForm/>
                    </div>}   
                </div>
                
                <div className="my-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                {posts.map((post) => (
                    <div className="p-8 rounded-xl border border-border bg-secondary text-secondary-foreground shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer" onClick={()=>{navigate(`/post/${post.slug}`)}} key={post.slug}>                                    

                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold">
                        {post.title}
                        </h2>

                        <p className="text-muted-foreground text-base">
                        {post.description}
                        </p>

                        {/* Metadata estilo nota */}
                        <div className="flex items-center gap-3 pt-2 text-sm text-muted-foreground">
                        <img
                            src={post.authorAvatar}
                            className="w-8 h-8 rounded-full border border-border object-cover"
                        />
                        <span className="font-medium">@{post.authorName}</span>
                        <span>•</span>
                        <span>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </>
            )}
        </div>
        </>
    );
}
