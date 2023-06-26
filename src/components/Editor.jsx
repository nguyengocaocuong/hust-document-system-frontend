import React from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";

function Editor({ editorRef, height = 400, setContent = () => {}, content = "" }) {
  return (
    <TinyEditor
      apiKey="d2juz75n4zh852tseu5bqt1p48krngjmie8n8pv16rzajfbv"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={content}
      init={{
        branding: false,
        height: height,
        width: "100%",
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          "emoticons",
        ],

        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | emoticons ",
        image_advtab: true,
      }}
      onChange={() => {
        setContent(editorRef.current.getContent());
      }}
    />
  );
}

export default Editor;
