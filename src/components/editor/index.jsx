import React from "react";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function Editor({editorState, setEditorState}) {

  return (
    <DraftEditor
      wrapperStyle={{
        maxHeight: "100%",
        overflow: "hidden",
        height: "100%",
      }}
      editorStyle={{
        height: "80%",
        overflow: "auto",
      }}
      toolbarClassName="toolbarClassName"
      editorState={editorState}
      onEditorStateChange={setEditorState}
    />
  );
}

export default Editor;
