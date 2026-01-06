"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "next-themes";

import { motion } from "motion/react";
import { cn } from "@/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  useEffect(() => {
    // SSR mounting pattern - use setTimeout to avoid synchronous setState
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Determine current theme: handle system theme and SSR
  const currentTheme = mounted
    ? (theme === "system" ? systemTheme : theme)
    : "dark";

  const rotateDirection = useCallback((currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  }, [clockwise]);

  const movingMap: Record<Direction, string> = useMemo(() => {
    // Use primary orange gradient colors for both light and dark modes
    if (currentTheme === "dark") {
      return {
        TOP: "radial-gradient(20.7% 50% at 50% 0%, rgba(249, 115, 22, 0.95) 0%, rgba(251, 146, 60, 0.6) 50%, rgba(251, 191, 36, 0) 100%)",
        LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, rgba(249, 115, 22, 0.95) 0%, rgba(251, 146, 60, 0.6) 50%, rgba(251, 191, 36, 0) 100%)",
        BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, rgba(249, 115, 22, 0.95) 0%, rgba(251, 146, 60, 0.6) 50%, rgba(251, 191, 36, 0) 100%)",
        RIGHT: "radial-gradient(16.2% 41.199999999999996% at 100% 50%, rgba(249, 115, 22, 0.95) 0%, rgba(251, 146, 60, 0.6) 50%, rgba(251, 191, 36, 0) 100%)",
      };
    } else {
      // Light mode: use vibrant orange/primary color gradients
      return {
        TOP: "radial-gradient(20.7% 50% at 50% 0%, rgba(249, 115, 22, 0.95) 0%, rgba(251, 146, 60, 0.7) 50%, rgba(251, 191, 36, 0) 100%)",
        LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, rgba(249, 115, 22, 0.95) 0%, rgba(251, 146, 60, 0.7) 50%, rgba(251, 191, 36, 0) 100%)",
        BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, rgba(249, 115, 22, 0.95) 0%, rgba(251, 146, 60, 0.7) 50%, rgba(251, 191, 36, 0) 100%)",
        RIGHT: "radial-gradient(16.2% 41.199999999999996% at 100% 50%, rgba(249, 115, 22, 0.95) 0%, rgba(251, 146, 60, 0.7) 50%, rgba(251, 191, 36, 0) 100%)",
      };
    }
  }, [currentTheme]);

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #f97316 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      // Slightly faster animation - reduce interval time for quicker motion
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, (duration * 1000) / 1.4); // 1.4x faster (not too fast)
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise, rotateDirection]);

  return (
    <Tag
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border content-center bg-background/50 hover:bg-background/30 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto z-10 px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(1.5px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: (duration ?? 1) / 1.5 }}
      />
      <div className="bg-background absolute z-[1] flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}

