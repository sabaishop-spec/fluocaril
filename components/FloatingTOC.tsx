"use client";

import { useState } from "react";
import { List, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function FloatingTOC({ toc }: { toc: TOCItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!toc || toc.length === 0) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-6 z-40 p-3 bg-brand-dark text-white rounded-full shadow-lg opacity-50 hover:opacity-100 transition-opacity md:bottom-12 md:left-10"
        aria-label="Mở mục lục"
      >
        <List className="w-6 h-6" />
      </button>

      {/* Backdrop for mobile (close on click) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Floating Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 overflow-y-auto border-r border-slate-100 flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur z-10">
              <h2 className="text-xl font-bold font-serif text-navy">Mục lục</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-brand-dark transition-colors rounded-full hover:bg-slate-50"
                aria-label="Đóng mục lục"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {toc.map((item, index) => (
                  <li key={index} className={`${item.level === 3 ? 'ml-6' : ''}`}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className="text-slate-600 hover:text-brand-dark font-medium flex items-start gap-2 group transition-colors text-sm"
                    >
                      <span className="text-brand/50 mt-1 shrink-0">•</span>
                      <span className="group-hover:underline underline-offset-2">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
