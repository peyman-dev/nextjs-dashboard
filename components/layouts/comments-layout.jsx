import React, { useState } from "react";
import TextEditor from "../ui/text-editor";

const CommentsInput = () => {
  const [comment, setComment] = useState(" ");

  
  
  return (
    <div>
      <TextEditor onChange={setComment} value={comment} />
    </div>
  );
};

const CommentsArea = () => {
  return <div className="mx-auto my-10 prose">
    <h4>
        <strong>Write something</strong>
    </h4>
    <CommentsInput />
  </div>;
};

export default CommentsArea;
