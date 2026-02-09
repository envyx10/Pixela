import { useState, useEffect, useMemo } from "react";
import { libraryAPI } from "@/api/library/library";
import { LibraryItemWithDetails, WatchStatus } from "@/api/library/types";

export const useLibraryItems = () => {
  const [items, setItems] = useState<LibraryItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await libraryAPI.listWithDetails();
        if (mounted) setItems(data);
      } catch (err) {
        if (mounted) {
          console.error(err);
          setError("No se pudo cargar la biblioteca");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchItems();

    return () => {
      mounted = false;
    };
  }, []);

  const getFilteredItems = (filter: string) => {
    if (filter === "ALL") return items;
    return items.filter((item) => item.status === filter);
  };

  const stats = useMemo(() => {
    return {
      total: items.length,
      planToWatch: items.filter((i) => i.status === WatchStatus.PLAN_TO_WATCH)
        .length,
      watching: items.filter((i) => i.status === WatchStatus.WATCHING).length,
      completed: items.filter((i) => i.status === WatchStatus.COMPLETED).length,
      dropped: items.filter((i) => i.status === WatchStatus.DROPPED).length,
    };
  }, [items]);

  return { items, loading, error, getFilteredItems, stats };
};
