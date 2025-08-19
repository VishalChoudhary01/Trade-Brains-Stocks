import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StockItem from "../moleclues/stockItem";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function StockList({ gainers, losers }) {
  const router = useRouter();
  const [savedStocks, setSavedStocks] = useState({});

  // Load saved stocks from localStorage on initial render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedStocks")) || {};
    setSavedStocks(saved);
  }, []);

  // Toggle bookmark state
  const toggleBookmark = (stock, e) => {
    e.stopPropagation();
    const newSavedStocks = { ...savedStocks };

    if (newSavedStocks[stock.id]) {
      delete newSavedStocks[stock.id];
    } else {
      newSavedStocks[stock.id] = stock;
    }

    localStorage.setItem("savedStocks", JSON.stringify(newSavedStocks));
    setSavedStocks(newSavedStocks);
  };

  return (
    <div className="bg-glassBg dark:bg-glassDarkBg rounded-xl shadow-lg overflow-hidden">
      {/* Gainers */}
      <div className="mb-6 md:mb-10">
        <div className="bg-gradient-to-r from-gainerHeaderFrom to-gainerHeaderTo dark:from-gainerHeaderDarkFrom dark:to-gainerHeaderDarkTo p-3 md:p-5 border-b border-gainerHeaderBorder dark:border-gainerHeaderDarkBorder">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gainText dark:text-gainDarkText flex items-center">
            <span className="bg-gainText text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center mr-2 md:mr-3">
              <FaArrowUp className="text-[10px] sm:text-xs md:text-sm" />
            </span>
            Top Gainers
            <span className="text-gainText ml-1 md:ml-2 text-xs sm:text-sm md:text-base font-normal">
              ({gainers?.length || 0})
            </span>
          </h2>
        </div>
        <div className="divide-y divide-glassBorder dark:divide-glassDarkBorder">
          {gainers?.map((stock) => (
            <StockItem
              key={stock.id}
              stock={stock}
              isGainer
              savedStocks={savedStocks}
              toggleBookmark={toggleBookmark}
              router={router}
            />
          ))}
        </div>
      </div>

      {/* Losers */}
      <div>
        <div className="bg-gradient-to-r from-loserHeaderFrom to-loserHeaderTo dark:from-loserHeaderDarkFrom dark:to-loserHeaderDarkTo p-3 md:p-5 border-b border-loserHeaderBorder dark:border-loserHeaderDarkBorder">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-lossText dark:text-lossDarkText flex items-center">
            <span className="bg-lossText text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center mr-2 md:mr-3">
              <FaArrowDown className="text-[10px] sm:text-xs md:text-sm" />
            </span>
            Top Losers
            <span className="text-lossText ml-1 md:ml-2 text-xs sm:text-sm md:text-base font-normal">
              ({losers?.length || 0})
            </span>
          </h2>
        </div>
        <div className="divide-y divide-glassBorder dark:divide-glassDarkBorder">
          {losers?.map((stock) => (
            <StockItem
              key={stock.id}
              stock={stock}
              isGainer={false}
              savedStocks={savedStocks}
              toggleBookmark={toggleBookmark}
              router={router}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
