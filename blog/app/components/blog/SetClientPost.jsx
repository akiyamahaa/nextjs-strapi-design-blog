"use client";

import { useEffect } from "react";
import { useBlogStore } from "@/stores/useBlogStore";

export default function SetCurrentPostClient({ currentPost }) {
  const setCurrentPost = useBlogStore((state) => state.setCurrentPost);

  useEffect(() => {
    setCurrentPost(currentPost);
  }, [currentPost, setCurrentPost]);

  return null;
}
