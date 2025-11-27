import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import rehypeHighlight from "rehype-highlight";
import "prism-themes/themes/prism-one-dark.css";



export default function MarkdownView({ content }) {
    return (
        <article className="prose prose-md prose-code: text-xl prose-stone max-w-screen
                    prose-headings:font-bold prose-headings:text-primary
                    prose-h1:text-4xl
                    prose-h2:text-3xl
                    prose-h3:text-2xl
                    prose-p:leading-relaxed prose-p:text-primary prose-p:text-lg
                    prose-strong:text-primary prose-strong:font-bold
                    prose-em:text-primary
                    prose-ul:my-6 prose-ol:my-6
                    prose-li:my-2
                    prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:bg-border prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic
                    prose-a:text-blue-500 prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline prose-a:font-medium
                    prose-pre:bg-stone-900 prose-pre:border prose-pre:border-stone-700
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto
                    prose-table:border prose-table:border-border
                    prose-th:bg-stone-100 prose-th:text-stone-900 prose-th:font-bold
                    prose-td:border prose-td:border-stone-200
                    prose-hr:border-stone-300
                    
                    /* Dark mode */
                    dark:prose-invert
                    dark:prose-stone
                    ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[                  
                    rehypeSlug,
                    rehypeHighlight,
                    rehypePrism
                ]}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}