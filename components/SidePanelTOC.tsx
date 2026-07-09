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
      <div
        className={`fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-300 left-0 lg:left-[calc(50%-32rem)] xl:left-[calc(50%-38rem)] 2xl:left-[calc(50%-44rem)] ${
          showTrigger && !isOpen
            ? "opacity-60 hover:opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none -translate-x-2"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white border border-gray-200 p-2.5 rounded-r-lg lg:rounded-full shadow-md hover:bg-gray-50 hover:scale-105 transition-all"
          aria-label="Mở mục lục"
        >
          <ListOrdered className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Slide-out Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl border-r border-gray-200 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Panel */}
        <div className="bg-[#333] text-white p-4 flex justify-between items-center shrink-0">
          <span className="font-bold text-lg">≡ Mục lục</span>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300 transition-colors"
            aria-label="Đóng mục lục"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items List */}
        <div className="overflow-y-auto flex-1 py-2">
          {toc.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-gray-100 ${
                  isActive
                    ? "bg-emerald-600 text-white font-bold"
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
