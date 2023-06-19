import React from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";

function Editor({ editorRef }) {
  return (
    <TinyEditor
      apiKey="d2juz75n4zh852tseu5bqt1p48krngjmie8n8pv16rzajfbv"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue=""
      init={{
        branding: false,
        height: 400,
        menubar: true,
        plugins:
          "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
        toolbar:
          "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
        image_advtab: true,
      }}
    />
  );
}

export default Editor;
