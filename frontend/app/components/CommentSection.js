"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Send, Trash2 } from "lucide-react";
import { createComment, deleteComment } from "../lib/api";
import toast from "react-hot-toast";

export default function CommentSection({
  productId,
  comments: initialComments,
}) {
  const { getToken } = useAuth();
  const { user, isSignedIn } = useUser();
  const [comments, setComments] = useState(initialComments || []);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const token = await getToken();
      const newComment = await createComment(productId, { content }, token);
      setComments((prev) => [
        ...prev,
        {
          ...newComment,
          user: {
            name: user.fullName || user.firstName,
            imageUrl: user.imageUrl,
          },
        },
      ]);
      setContent("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const token = await getToken();
      await deleteComment(commentId, token);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast.success("Comment deleted");
    } catch (err) {
      toast.error(err.message || "Failed to delete comment");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Comments ({comments.length})</h3>

      {/* Comment list */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm opacity-50 italic">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-3 p-4 bg-base-200 rounded-xl animate-fadeIn"
          >
            <div className="avatar flex-shrink-0">
              <div className="w-8 h-8 rounded-full">
                {comment.user?.imageUrl ? (
                  <Image
                    src={comment.user.imageUrl}
                    alt={comment.user.name || "User"}
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full text-xs font-bold">
                    {(comment.user?.name || "U")[0]}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {comment.user?.name || "Anonymous"}
                </span>
                {isSignedIn && user?.id === comment.userId && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-sm opacity-80 mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add comment form */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="input input-bordered flex-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-primary btn-square"
            disabled={loading || !content.trim()}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      ) : (
        <p className="text-sm opacity-60 text-center py-4 bg-base-200 rounded-xl">
          Sign in to leave a comment
        </p>
      )}
    </div>
  );
}
