import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:!text-xs md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export const HashtagsInput = ({ onChange, ...props }) => {
  const [hashtags, setHashtags] = React.useState([]);
  const [input, setInput] = React.useState("");

  const splitHashtags = (value) => {
    setInput(value);

    if (value.trim().includes(",")) {
      // Split and trim the input
      const newTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "" && !hashtags.includes(tag)); // Filter empty or duplicate tags

      // Update hashtags and clear the input
      if (newTags.length > 0) {
        setHashtags((prev) => [...prev, ...newTags]);
        setInput(""); // Clear input after processing
        onChange([...hashtags, ...newTags]); // Notify parent with updated hashtags
      }
    }
  };

  const onEnterPressed = () => splitHashtags(input + ",");

  const removeTag = (data) => {
    console.log(data);
    let newTags = hashtags.filter((tag) => tag !== data);
    setHashtags(newTags);
    onChange(newTags);
  };

  return (
    <div>
      <Input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.trim() !== "") {
            onEnterPressed();
          }
        }}
        value={input}
        onChange={(e) => {
          splitHashtags(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Add a #hashtag"
        {...props}
      />
      <div
        data-
        className="flex mt-2 items-center gap-1 child:cursor-pointer child-hover:bg-blue-200/40 child:duration-100 text-xs child:bg-blue-100 text-blue-500 child:px-3 child:py-1 child:rounded"
      >
        {hashtags.map((tag) => (
          <span
            onClick={(e) => {
              removeTag(e.currentTarget.dataset.tag);
            }}
            key={tag}
            data-tag={tag}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export { Input };
