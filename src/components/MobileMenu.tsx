import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Home,
  Box,
  Building2,
  BookOpen,
  Headphones,
  Lightbulb,
  Leaf,
  TrendingUp,
  Mail,
  ArrowLeft,
  ChevronRight,
  GripHorizontal,
  Server,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  sub?: MenuItem[];
}

const mainMenu: MenuItem[] = [
  {
    icon: Home,
    title: "Home",
    subtitle: "Welcome to our comprehensive platform",
  },
  {
    icon: Box,
    title: "Products & Services",
    subtitle: "Explore our comprehensive offerings",
    sub: [
      {
        icon: Server,
        title: "System Architecture",
        subtitle: "Scalable system design and planning",
      },
      {
        icon: Zap,
        title: "Performance Optimization",
        subtitle: "Application and system optimization",
      },
      {
        icon: Shield,
        title: "Security Audits",
        subtitle: "Comprehensive security assessments",
      },
    ],
  },
  {
    icon: Building2,
    title: "Industry Solutions",
    subtitle: "Specialized solutions for different industries",
  },
  {
    icon: BookOpen,
    title: "Resources",
    subtitle: "Knowledge base, tools, and learning materials",
  },
  {
    icon: Headphones,
    title: "Support",
    subtitle: "Get help and support when you need it",
  },
  {
    icon: Lightbulb,
    title: "Research & Innovation",
    subtitle: "Cutting-edge research and innovation initiatives",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    subtitle: "Environmental responsibility and sustainable technology",
  },
  {
    icon: TrendingUp,
    title: "Investor Relations",
    subtitle: "Financial information and investor resources",
  },
  {
    icon: Mail,
    title: "Contact",
    subtitle: "Get in touch with our team",
  },
];

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [submenu, setSubmenu] = useState<MenuItem[] | null>(null);
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
    setSubmenu(null);
    setOpen(false);
  }, []);

  const openSub = useCallback((items?: MenuItem[]) => {
    if (items) setSubmenu(items);
  }, []);

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
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl max-h-[85dvh] md:max-w-md md:left-1/2 md:-translate-x-1/2 overflow-hidden"
            >
              {/* Handle */}
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-5 pt-3 pb-2 border-b border-gray-100">
                <div className="mx-auto flex items-center justify-center">
                  <GripHorizontal className="w-6 h-6 text-gray-400" aria-hidden />
                </div>
              </div>

              <div className="overflow-y-auto p-5 pt-3 max-h-[calc(85dvh-44px)]">
              <AnimatePresence mode="wait">
                {!submenu ? (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, x: shouldReduce ? 0 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduce ? 0 : -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {mainMenu.map((item) => (
                      <div
                        key={item.title}
                        onClick={() => openSub(item.sub)}
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
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="sub"
                    initial={{ opacity: 0, x: shouldReduce ? 0 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduce ? 0 : -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <button
                      onClick={() => setSubmenu(null)}
                      className="flex items-center gap-2 text-gray-600 font-medium mb-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    {submenu.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start justify-between p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition"
                      >
                        <div className="flex items-start gap-3">
                          <item.icon className="w-5 h-5 text-gray-700 mt-1" />
                          <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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
