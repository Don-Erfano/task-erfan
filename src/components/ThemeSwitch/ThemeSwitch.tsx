"use client";

import { FC, useEffect, useState } from "react";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

const ThemeSwitch: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <Switch
      color="default"
      size="lg"
      isSelected={isDark}
      isDisabled={!mounted}
      onValueChange={(value) => setTheme(value ? "dark" : "light")}
      classNames={{
        base: ["backdrop-blur-xl", "transition-all duration-300 ease-out"]
          .filter(Boolean)
          .join(" "),
        wrapper: "transition-[background-color] duration-300 ease-out",
        thumb: [
          "bg-background text-foreground",
          "transition-transform duration-300 ease-out",
          "shadow-[0_4px_12px_rgba(0,0,0,0.35)]",
        ].join(" "),
      }}
      startContent={
        <Icon
          icon="ph:sun-duotone"
          className="text-xl text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.55)] transition-all duration-300 ease-out"
        />
      }
      endContent={
        <Icon
          icon="ph:moon-duotone"
          className="text-xl text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] transition-all duration-300 ease-out"
        />
      }
      thumbIcon={() => (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={isDark ? "dark" : "light"}
            initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
            transition={{ type: "keyframes", stiffness: 260, damping: 18 }}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Icon
                icon="ph:moon-stars-bold"
                className="text-base text-sky-400"
              />
            ) : (
              <Icon icon="ph:sun-bold" className="text-base text-amber-300" />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    />
  );
};
export default ThemeSwitch;
