import React from "react";

export default function CommentItem({ username, createdAt, content }) {
  const initial = username?.[0]?.toUpperCase() || "?";

  return (
    <div className="flex items-start gap-4 border-gray-800 p-4 rounded-lg border-l">
      {/* Avatar */}
      <div className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white font-bold rounded-full text-sm">
        {initial}
      </div>

      {/* Nội dung */}
      <div>
        <p className="font-semibold">{username}</p>
        <p className="text-sm text-gray-500 mb-2">{createdAt}</p>
        <p>{content}</p>
      </div>
    </div>
  );
}
