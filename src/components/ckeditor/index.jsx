"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import CKEditor components (no SSR)
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);
const ClassicEditor = dynamic(
  () => import("@ckeditor/ckeditor5-build-classic"),
  { ssr: false }
);

const RichTextEditor = ({ value, onChange }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div className="w-full">
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            onChange(editor.getData());
          }}
        />
      ) : (
        <p>Loading editor...</p>
      )}
    </div>
  );
};

export default RichTextEditor;
