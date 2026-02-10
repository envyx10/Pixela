"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiPlus,
  FiCheck,
  FiChevronDown,
  FiTrash2,
  FiClock,
  FiPlay,
  FiStopCircle,
} from "react-icons/fi";
import { WatchStatus } from "@/api/library/types";
import { useLibraryStatus } from "../../hooks/useLibraryStatus";
import clsx from "clsx";

interface LibraryButtonProps {
  tmdbId: number;
  itemType: "movie" | "series";
  title: string;
  className?: string;
}

const STATUS_CONFIG = {
  [WatchStatus.PLAN_TO_WATCH]: {
    label: "Planeado",
    icon: FiClock,
    color: "text-blue-400",
  },
  [WatchStatus.WATCHING]: {
    label: "Viendo",
    icon: FiPlay,
    color: "text-green-400",
  },
  [WatchStatus.COMPLETED]: {
    label: "Completado",
    icon: FiCheck,
    color: "text-yellow-400",
  },
  [WatchStatus.DROPPED]: {
    label: "Abandonado",
    icon: FiStopCircle,
    color: "text-red-400",
  },
};

export const LibraryButton = ({
  tmdbId,
  itemType,
  title,
  className,
}: LibraryButtonProps) => {
  const { status, loading, isAuthenticated, updateStatus, removeFromLibrary } =
    useLibraryStatus({
      tmdbId,
      itemType,
    });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdateStatus = (newStatus: WatchStatus) => {
    setIsOpen(false);
    updateStatus(newStatus);
  };

  const handleRemove = () => {
    setIsOpen(false);
    removeFromLibrary();
  };

  if (!isAuthenticated) return null;

  const CurrentIcon = status ? STATUS_CONFIG[status].icon : FiPlus;
  const currentLabel = status ? STATUS_CONFIG[status].label : "Añadir a lista";

  return (
    <div className={clsx("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        title={title}
        aria-label={`Añadir ${title} a la biblioteca`}
        className={clsx(
          "flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-300 border backdrop-blur-md whitespace-nowrap",
          status
            ? // Active: Dark background with colored text/border accent
              "bg-[#1A1A1A] text-pixela-accent border-pixela-accent/50 hover:bg-[#252525]"
            : // Inactive: Dark background with white text (matches Review button base)
              "bg-[#1A1A1A] text-white border-white/10 hover:bg-[#252525]",
          className,
        )}
      >
        <CurrentIcon className="w-5 h-5" />
        <span>{currentLabel}</span>
        <FiChevronDown
          className={clsx(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl p-1 z-50 animate-fade-in overflow-hidden">
          <div className="flex flex-col gap-1">
            {Object.entries(STATUS_CONFIG).map(([key, config]) => {
              const statusKey = key as WatchStatus;
              const StatusIcon = config.icon;
              const isActive = status === statusKey;

              return (
                <button
                  key={key}
                  onClick={() => handleUpdateStatus(statusKey)}
                  className={clsx(
                    "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <StatusIcon className={clsx("w-4 h-4", config.color)} />
                  <span className="flex-1 text-left">{config.label}</span>
                  {isActive && (
                    <FiCheck className="w-4 h-4 text-pixela-accent" />
                  )}
                </button>
              );
            })}

            {status && (
              <>
                <div className="h-px bg-white/10 my-1" />
                <button
                  onClick={handleRemove}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span className="flex-1 text-left">Eliminar de lista</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
