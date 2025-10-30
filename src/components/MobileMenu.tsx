import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, GripHorizontal } from "lucide-react";
import type { MenuItem } from "./menu/types";
import { mainMenu } from "./menu/data";
import MenuList from "./menu/MenuList";

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  // Stack of menus to support multi-level navigation
  const [menuStack, setMenuStack] = useState<MenuItem[][]>([]);
  const shouldReduce = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement | null>(null);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  const close = useCallback(() => {
    setMenuStack([]);
    setOpen(false);
  }, []);

  const pushMenu = useCallback((items?: MenuItem[]) => {
    if (items && items.length) setMenuStack((s) => [...s, items]);
  }, []);

  const popMenu = useCallback(() => {
    setMenuStack((s) => s.slice(0, -1));
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-100">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-md active:scale-[0.98] transition"
      >
        Open Menu
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Background overlay */}
            <motion.div
              role="button"
              aria-label="Close menu"
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />

            {/* Bottom Sheet */}
            <motion.div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              initial={{ y: "100%", opacity: shouldReduce ? 1 : 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 1 }}
              transition={shouldReduce ? { duration: 0.2 } : { type: "spring", damping: 28, stiffness: 320 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 800) close();
              }}
              className="fixed bottom-0 md:bottom-6 left-0 right-0 bg-white rounded-t-3xl md:rounded-3xl shadow-xl max-h-[92dvh] md:max-w-lg lg:max-w-xl md:left-1/2 md:-translate-x-1/2 overflow-hidden"
            >
              {/* Handle */}
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-5 pt-3 pb-2 border-b border-gray-100">
                <div className="mx-auto flex items-center justify-center">
                  <GripHorizontal className="w-6 h-6 text-gray-400" aria-hidden />
                </div>
              </div>

              <div className="overflow-y-auto p-5 pt-3 max-h-[calc(92dvh-44px)]">
              <AnimatePresence mode="wait">
                {menuStack.length === 0 ? (
                  <MenuList items={mainMenu} onSelect={(item) => pushMenu(item.sub)} />
                ) : (
                  <motion.div key={`level-${menuStack.length}`} initial={{ opacity: 0, x: shouldReduce ? 0 : 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: shouldReduce ? 0 : -50 }} transition={{ duration: 0.3 }} className="space-y-3">
                    <button
                      onClick={menuStack.length > 0 ? popMenu : close}
                      className="cursor-pointer flex items-center gap-2 text-gray-600 font-medium mb-2"
                    >
                      <ArrowLeft className="w-4 h-4 cursor-pointer" /> Back
                    </button>
                    {menuStack[menuStack.length - 1] && (
                      <MenuList
                        items={menuStack[menuStack.length - 1]}
                        onSelect={(item) => pushMenu(item.sub)}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
