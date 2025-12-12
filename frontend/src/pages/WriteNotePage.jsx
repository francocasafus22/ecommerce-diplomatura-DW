import MarkdownView from "@/components/MarkdownView";
import TextEditor from "@/components/TextEditor";

import { useState } from "react";

export default function WriteNotePage() {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="w-full max-w-7xl flex-1 mt-5 space-y-5 px-5 xl:px-0">
      <TextEditor value={markdown} onChange={setMarkdown} />

      <div className="border border-border rounded-lg p-10">
        <MarkdownView content={markdown}></MarkdownView>
      </div>
    </div>
  );
}
