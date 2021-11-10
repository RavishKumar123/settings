import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function App(props) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const myCustomOnChangeHandler = (inst) => {
    console.log("Some one modified something");
    console.log("The HTML is now:" + inst);
  };
  return (
    <>
      <br />
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={`${props.value}`}
        onEditorChange={(text) => props.onChange(text)}
        init={{
          height: 350,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
}
