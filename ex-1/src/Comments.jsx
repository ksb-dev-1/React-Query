import React from "react";
import { fetchComments } from "./api";
import { useQuery } from "@tanstack/react-query";

export default function Comments({ postId }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    staleTime: 2000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <h3 style={{ color: "red" }}>Oops something went wrong!</h3>
        <p>{error.toString()}</p>
      </div>
    );
  }
  return (
    <div>
      {data.map((comment) => (
        <li key={comment.id}>
          <span style={{ fontWeight: "500" }}>{comment.email}: </span>
          {comment.body}
        </li>
      ))}
    </div>
  );
}
