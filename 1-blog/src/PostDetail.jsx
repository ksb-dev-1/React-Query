import { useMutation } from "@tanstack/react-query";
import { deletePost, updatePost } from "./api";
import Comments from "./Comments";
import "./PostDetail.css";

export default function PostDetail({ post }) {
  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  const updateMutation = useMutation({
    mutationFn: (postId) => updatePost(postId),
  });

  return (
    <div>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isPending && (
        <span style={{ color: "purple" }}>Deleting the post...</span>
      )}
      {deleteMutation.isError && (
        <span style={{ color: "red" }}>Error deleting the post!</span>
      )}
      {deleteMutation.isSuccess && (
        <span style={{ color: "green" }}>Post has (not) been deleted.</span>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isPending && (
        <span style={{ color: "purple" }}>Updating the post...</span>
      )}
      {updateMutation.isError && (
        <span style={{ color: "red" }}>Error updating the post!</span>
      )}
      {updateMutation.isSuccess && (
        <span style={{ color: "green" }}>Post has (not) been updated.</span>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      <Comments postId={post.id} />
    </div>
  );
}
