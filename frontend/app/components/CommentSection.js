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
      <h3 className="text-xl font-bold text-text-primary">
        Comments{" "}
        <span className="text-text-muted font-normal">({comments.length})</span>
      </h3>

      {/* Comment list */}
      <div className="space-y-3">
        {comments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-sm text-text-muted">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-3 p-4 bg-surface-white rounded-2xl animate-fadeIn"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-surface-card">
              {comment.user?.imageUrl ? (
                <Image
                  src={comment.user.imageUrl}
                  alt={comment.user.name || "User"}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-text-primary text-text-light text-xs font-bold">
                  {(comment.user?.name || "U")[0]}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-primary">
                  {comment.user?.name || "Anonymous"}
                </span>
                {isSignedIn && user?.id === comment.userId && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-1.5 text-text-muted hover:text-danger rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add comment form */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 px-5 py-3 text-sm bg-surface-white border border-border-default rounded-full text-text-primary placeholder-text-muted focus:border-text-primary focus:outline-none transition-colors duration-200"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="px-5 py-3 bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
            disabled={loading || !content.trim()}
          >
            {loading ? (
              <div className="spinner w-4 h-4 border-white/30 border-t-white" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="text-center py-6 px-4 bg-surface-white rounded-2xl">
          <p className="text-sm text-text-muted">Sign in to leave a comment</p>
        </div>
      )}
    </div>
  );
}
