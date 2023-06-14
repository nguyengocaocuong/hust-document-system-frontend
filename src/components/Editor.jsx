import React from "react";
import { Editor as TinyEditor} from '@tinymce/tinymce-react';

function Editor({editorRef}) {
  return (
    <TinyEditor
    apiKey='d2juz75n4zh852tseu5bqt1p48krngjmie8n8pv16rzajfbv'
    onInit={(evt, editor) => editorRef.current = editor}
    initialValue=""
    init={{
      height: '100%',
      menubar: false,
      resize:'none',
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
  />
  );
}

export default Editor;
