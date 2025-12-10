import MarkdownView from "@/components/MarkdownView";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export default function WriteNotePage() {
  const editorRef = useRef(null);
  const [markdown, setMarkdown] = useState("");

  const toggleHeading = (label, symbol) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const container = range.startContainer;

    // Ubicar linea completa
    const line = container.textContent || "";
    let newText = "";
    if (line[0] == "#") {
      newText = line
        .split(" ")
        .slice(1)
        .filter((char) => char != "")
        .join(" ");
      container.textContent = newText;
      return;
    }
    const regex = `/^${symbol}\s?/g`;
    container.textContent = symbol + " " + line.replace(regex, "");
  };

  const viewMarkdown = () => {
    const html = editorRef.current.innerHTML || "";
    const md = html
      .replace(/<div><br><\/div>/g, "\n")
      .replace(/<div>/g, "\n")
      .replace(/<\/div>/g, "")
      .replace(/<p>/g, "\n")
      .replace(/<\/p>/g, "")
      .replace(/<br>/g, "\n")
      .replace(/&nbsp;/g, " ");
    setMarkdown(md.trim());
  };

  return (
    <div className="w-full max-w-7xl flex-1 mt-5 space-y-5 px-5 xl:px-0">
      <button
        className="border border-border rounded-lg bg-primary text-primary-foreground p-2 font-bold cursor-pointer"
        onClick={() => toggleHeading("H1", "#")}
      >
        H1
      </button>
      <button
        className="border border-border rounded-lg bg-primary text-primary-foreground p-2 font-bold cursor-pointer"
        onClick={() => toggleHeading("H2", "##")}
      >
        H2
      </button>
      <button
        className="border border-border rounded-lg bg-primary text-primary-foreground p-2 font-bold cursor-pointer"
        onClick={() => toggleHeading("H3", "###")}
      >
        H3
      </button>
      <button
        className="border border-border rounded-lg bg-primary text-primary-foreground p-2 font-bold cursor-pointer"
        onClick={() => toggleHeading("H4", "####")}
      >
        H4
      </button>
      <button
        className="border border-border rounded-lg bg-primary text-primary-foreground p-2 font-bold cursor-pointer"
        onClick={() => toggleHeading("H5", "#####")}
      >
        H5
      </button>
      <div
        contentEditable
        className="min-h-[300px] p-4 outline-none prose dark:prose-invert
                max-w-none border-2 rounded-lg border-border "
        ref={editorRef}
      ></div>
      <button
        className="border border-border rounded-lg bg-primary text-primary-foreground p-2 font-bold cursor-pointer"
        onClick={viewMarkdown}
      >
        Visualizar
      </button>
      <div className="border border-border rounded-lg p-10">
        <MarkdownView content={markdown}></MarkdownView>
      </div>
    </div>
  );
}
