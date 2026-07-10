"use client";

import { useEffect, useState } from "react";
import { ListOrdered, X } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function SidePanelTOC({ toc }: { toc: TOCItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [showTrigger, setShowTrigger] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowTrigger(true);
      } else {
        setShowTrigger(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" } // trigger when reaching top
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!toc || toc.length === 0) return null;

  return (
    <>
      {/* Trigger Button */}
      {!isOpen && showTrigger && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-0 top-32 z-40 bg-white shadow-md rounded-r-lg p-2 hover:bg-gray-50 transition-colors"
          aria-label="Mở mục lục"
        >
          <ListOrdered className="w-6 h-6 text-slate-600" />
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Panel */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-navy" />
            <span className="font-bold text-lg text-navy">Mục lục</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            aria-label="Đóng mục lục"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          {toc.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-gray-50 ${
                  isActive
                    ? "bg-brand text-white font-bold"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 1 + 1}rem` }}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
