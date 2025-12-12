import { useRef } from "react";

export default function TextEditor({ value, onChange }) {
  const textareaRef = useRef(null);

  const replaceLine = (line, newValue) => {
    const lines = value.split("\n");
    const index = lines.indexOf(line);
    if (index === -1) return value;
    lines[index] = newValue;
    return lines.join("\n");
  };

  const getCurrentLine = () => {
    const textarea = textareaRef.current;
    const cursor = textarea.selectionStart;
    const lines = value.split("\n");

    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (cursor <= count) return lines[i];
    }
    return "";
  };

  // Detectar enter para listas
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const textarea = textareaRef.current;
    const { selectionStart } = textarea;

    const lines = value.split("\n");

    // Obtener índice real de la línea donde está el cursor
    let charCount = 0;
    let lineIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      charCount += lines[i].length + 1;
      if (selectionStart <= charCount) {
        lineIndex = i;
        break;
      }
    }

    const currentLine = lines[lineIndex];

    // Si está vacía sale de la lista
    if (currentLine === "- " || currentLine.match(/^\d+\.\s$/)) {
      e.preventDefault();
      const updated = replaceLine(currentLine, "");
      onChange(updated);
      return;
    }

    // --- listas numeradas ---
    const matchNumbered = currentLine.match(/^(\d+)\.\s(.*)/);
    if (matchNumbered) {
      e.preventDefault();
      const nextNum = parseInt(matchNumbered[1]) + 1;

      const updatedValue =
        value.slice(0, selectionStart) +
        `\n${nextNum}. ` +
        value.slice(selectionStart);

      onChange(updatedValue);

      // esperar que termine de renderizar el change
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          selectionStart + 1 + `${nextNum}. `.length;
      }, 0);

      return;
    }

    // --- bullet list ---
    if (currentLine.startsWith("- ")) {
      e.preventDefault();

      const updatedValue =
        value.slice(0, selectionStart) + "\n- " + value.slice(selectionStart);

      onChange(updatedValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 3;
      }, 0);

      return;
    }
  };

  const toggleHeading = (level) => {
    const line = getCurrentLine();
    const prefix = "#".repeat(level) + " ";

    // si tiene el heading lo saca
    if (line.startsWith(prefix)) {
      const updated = replaceLine(line, line.replace(prefix, ""));
      onChange(updated);
      return;
    }

    // si tiene otro heading lo reemplaza
    const cleaned = line.replace(/^#{1,6}\s*/, "");
    const updated = replaceLine(line, prefix + cleaned);
    onChange(updated);
  };

  // Toogle bold/italic
  const toggleWrap = (before, after = before) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);

    const hasFormat = selected.startsWith(before) && selected.endsWith(after);

    let newText;

    if (hasFormat) {
      // quitar formato
      newText =
        value.slice(0, start) +
        selected.slice(before.length, selected.length - after.length) +
        value.slice(end);
    } else {
      // agregar formato
      newText =
        value.slice(0, start) + before + selected + after + value.slice(end);
    }

    onChange(newText);

    // esperar que termine de renderizar el change
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start;
      textarea.selectionEnd = start + selected.length;
    }, 0);
  };

  const actions = {
    bold: () => toggleWrap("**"),
    italic: () => toggleWrap("*"),
    h1: () => toggleHeading(1),
    h2: () => toggleHeading(2),
    h3: () => toggleHeading(3),
    bullet: () => insertAtCursor("- "),
    ordered: () => insertAtCursor("1. "),
    clear: () => onChange(""),
  };

  const insertAtCursor = (before, after = "") => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);

    const newText =
      value.slice(0, start) + before + selected + after + value.slice(end);

    onChange(newText);

    // esperar que termine de renderizar el change
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selected.length;
    }, 0);
  };

  return (
    <div className="border rounded-lg w-full bg-white shadow-md">
      {/* Toolbar */}
      <div className="flex gap-2 border-b p-2 bg-gray-100">
        <button onClick={actions.bold} className="btn">
          <b>B</b>
        </button>
        <button onClick={actions.italic} className="btn italic">
          I
        </button>

        <button onClick={actions.h1} className="btn">
          H1
        </button>
        <button onClick={actions.h2} className="btn">
          H2
        </button>
        <button onClick={actions.h3} className="btn">
          H3
        </button>

        <button onClick={actions.bullet} className="btn">
          •
        </button>
        <button onClick={actions.ordered} className="btn">
          1.
        </button>

        <button onClick={actions.clear} className="ml-auto text-red-500">
          Clear
        </button>
      </div>

      <div className="p-3">
        <textarea
          ref={textareaRef}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-60 outline-none resize-none font-mono"
          placeholder="Write your markdown..."
        />
      </div>

      <style>{`
        .btn {
          padding: 4px 8px;
          background: #e5e5e5;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }
        .btn:hover {
          background: #d5d5d5;
        }
      `}</style>
    </div>
  );
}
