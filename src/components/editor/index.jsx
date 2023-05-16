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
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
      }}
    />
  );
}

export default Editor;
