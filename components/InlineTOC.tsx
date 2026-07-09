"use client";

import { useState } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function InlineTOC({ toc }: { toc: TOCItem[] }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!toc || toc.length === 0) return null;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 mb-8 max-w-3xl">
      <div
        className="cursor-pointer select-none flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-slate-700" />
          <span className="italic font-semibold text-slate-800 text-lg">Mục lục</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 pt-2">
              {toc.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`${item.level === 3 ? "pl-6" : ""}`}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleScroll(e, item.id)}
                      className={`block transition-colors ${
                        item.level === 2
                          ? "text-slate-700 font-medium"
                          : "text-slate-600 text-sm"
                      } hover:text-emerald-600`}
                    >
                      {item.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
