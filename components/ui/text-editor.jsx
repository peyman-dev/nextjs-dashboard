"use client";

import { EditorContent, EditorRoot } from "novel";
import { Editor } from "novel-lightweight";
import { useState } from "react";

const TextEditor = ({ value, onChange }) => {
  return (
    <Editor
    className="w-full border rounded"
      onUpdate={(e) => {
        onChange(e.getHTML());
      }}
    />
  );
};
export default TextEditor;
