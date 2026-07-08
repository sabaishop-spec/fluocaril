import sys
import re

content = open('app/san-pham/ProductCatalog.tsx').read()

imports_old = 'import { useState } from "react";\nimport { Search, ChevronDown, ChevronRight } from "lucide-react";'
imports_new = 'import { useState, useEffect, useRef } from "react";\nimport { Search, ChevronDown, ChevronRight, Clock, X } from "lucide-react";'
content = content.replace(imports_old, imports_new)

# State additions
state_old = """  const [searchQuery, setSearchQuery] = useState("");
  
  const categoryParam = searchParams.get("category");"""

state_new = """  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentSearches");
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not load recent searches", e);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      try {
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      } catch (e) {
        console.error("Could not save recent searches", e);
      }
      return updated;
    });
  };

  const removeRecentSearch = (e: React.MouseEvent, queryToRemove: string) => {
    e.stopPropagation();
    setRecentSearches(prev => {
      const updated = prev.filter(s => s !== queryToRemove);
      try {
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      } catch (err) {
        console.error("Could not update recent searches", err);
      }
      return updated;
    });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveRecentSearch(searchQuery);
      setIsSearchFocused(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const categoryParam = searchParams.get("category");"""

content = content.replace(state_old, state_new)

# Search UI additions
ui_old = """              {/* Search Bar */}
              <div className="relative flex-1 w-full md:w-auto md:min-w-[240px] md:max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent sm:text-sm transition-all"
                />
              </div>"""

ui_new = """              {/* Search Bar */}
              <div className="relative flex-1 w-full md:w-auto md:min-w-[240px] md:max-w-xs" ref={searchRef}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={handleSearchKeyDown}
                  onBlur={() => {
                    // Slight delay to allow clicking on dropdown items
                    setTimeout(() => {
                      if (searchQuery.trim()) saveRecentSearch(searchQuery);
                    }, 200);
                  }}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent sm:text-sm transition-all relative z-10"
                />
                
                {/* Recent Searches Dropdown */}
                {isSearchFocused && recentSearches.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tìm kiếm gần đây</span>
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                      {recentSearches.map((search, idx) => (
                        <li key={idx} className="border-b border-slate-50 last:border-0">
                          <button
                            onClick={() => {
                              setSearchQuery(search);
                              setIsSearchFocused(false);
                              saveRecentSearch(search);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors text-left"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                              <span className="text-sm text-slate-700 truncate">{search}</span>
                            </div>
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={(e) => removeRecentSearch(e, search)}
                              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>"""

content = content.replace(ui_old, ui_new)

open('app/san-pham/ProductCatalog.tsx', 'w').write(content)
