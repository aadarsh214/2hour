import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { MenuItem } from "./types";

const listVariants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { when: "beforeChildren", staggerChildren: 0.02 } },
  exit: { opacity: 0, x: -32 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.16 } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.14 } },
};

export interface MenuListProps {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
}

const MenuList: React.FC<MenuListProps> = ({ items, onSelect }) => {
  const handleClick = (item: MenuItem) => {
    if (item.sub && item.sub.length) return onSelect(item);
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      key={items.map((i) => i.title).join("|")}
      variants={listVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.18 }}
      className="space-y-3"
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          variants={itemVariants}
          onClick={() => handleClick(item)}
          className="flex items-start justify-between p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition"
        >
          <div className="flex items-start gap-3">
            <item.icon className="w-5 h-5 text-gray-700 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          </div>
          {item.sub && <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MenuList;
