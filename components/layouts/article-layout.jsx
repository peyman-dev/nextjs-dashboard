"use client";
import React from "react";
import CommentsArea from "./comments-layout";

export const ArticleLayout = ({ data }) => {
  console.log(data);
  return (
    <>
      <article className="prose prose-sky mx-auto">
        <img
          src={data.cover}
          className="mb-10 max-w-[400px] mx-auto"
          alt={data.title}
        />
        <h1>{data.title}</h1>
        <div>
          <p className="text-sm">
            <strong>Created by:</strong>
            <span className="px-1 text-zinc-500">{data.creator.fullName}</span>
          </p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
      </article>
      <CommentsArea />
    </>
  );
};
