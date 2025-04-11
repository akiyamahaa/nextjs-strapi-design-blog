"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/stores/useCategoryStore";

export default function SetCurrentCategoryClient({ currentCategory }) {
  const setCurrentCategory = useCategoryStore(
    (state) => state.setCurrentCategory
  );

  useEffect(() => {
    setCurrentCategory(currentCategory);
  }, [currentCategory, setCurrentCategory]);

  return null;
}
