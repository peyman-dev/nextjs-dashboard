"use client";

import { NodeHtmlMarkdown } from "node-html-markdown";
import { EditorContent, EditorRoot } from "novel";
import { Editor } from "novel-lightweight";
import { useState } from "react";

const TextEditor = ({ value, onChange }) => {

  let markdown = NodeHtmlMarkdown.translate({
    'file1.html': value,
  })
  
  console.log(markdown)
  
  return (
    <Editor
    className="w-full border rounded"
      onUpdate={(e) => {
        onChange(e.getHTML());
      }}
      defaultValue={markdown["file1.html"]}
      disableLocalStorage={true}
    />
  );
};
export default TextEditor;
