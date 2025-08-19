import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const StockItem = ({ stock, isGainer, savedStocks, toggleBookmark, router }) => {
  return (
    <div
      onClick={() => router.push(`/stock/${stock.symbol}`)}
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-5 
        ${isGainer ? "hover:bg-gainerHoverBg" : "hover:bg-loserHoverBg"} 
        ${isGainer ? "dark:hover:bg-gainerDarkHoverBg" : "dark:hover:bg-loserDarkHoverBg"}
        cursor-pointer transition-all duration-200 relative group`}
    >
      {/* Bookmark */}
      <button
        onClick={(e) => toggleBookmark(stock, e)}
        className="absolute md:top-3 top-5 left-3 sm:static sm:mr-3 cursor-pointer  transition-colors"
        aria-label={savedStocks[stock.id] ? "Remove bookmark" : "Add bookmark"}
      >
        {savedStocks[stock.id] ? (
          <FaBookmark className="text-sm sm:text-base md:text-lg text-bookmarkIcontext dark:text-bookmarkIconDarktext" />
        ) : (
          <FaRegBookmark className="text-sm sm:text-base md:text-lg group-hover:text-bookmarkIconHover dark:group-hover:text-bookmarkIconDarkHover" />
        )}
      </button>

      {/* Stock Info */}
      <div className="pl-8 sm:pl-0 flex-1">
        <div className="flex flex-row items-center gap-x-3">
          <span className="font-bold text-textColor dark:text-textDarkColor text-sm sm:text-base md:text-lg truncate">
            {stock.symbol}
          </span>
          <span
            className={`mt-1 sm:mt-0 sm:ml-3 px-2 py-0.5  rounded-full truncate max-w-[100px] sm:max-w-none
              text-[12px] sm:text-xs 
              ${isGainer
              ? "bg-gainBadgeBg dark:bg-gainDarkBadgeBg text-gainBadgeText dark:text-gainBadgedarkText"
              : "bg-lossBadgeBg dark:bg-lossDarkBadgeBg text-lossBadgeText dark:text-lossBadgeDarkText"
              }`}
          >
            {stock.comp_name}
          </span>
        </div>
      </div>

      {/* Price & Change */}
      <div className="mt-2 sm:mt-0 text-right min-w-[90px]">
        <div
          className={`font-semibold text-sm sm:text-base md:text-lg 
            ${isGainer
              ? "text-gainText dark:text-gainDarkText"
              : "text-lossText dark:text-lossDarkText"
            }`}
        >
          ₹{stock.close?.toFixed(2) || "N/A"}
        </div>
        <div className="flex justify-end gap-1 sm:gap-2 mt-1">
          <span
            className={`px-1.5 py-0.5 rounded text-[12px] sm:text-xs md:text-sm 
              ${isGainer
              ? "bg-gainBadgeBg text-gainBadgeText dark:text-gainBadgedarkText"
              : "bg-lossBadgeBg text-lossBadgeText dark:text-lossBadgeDarkText"
              }`}
          >
            {isGainer ? "+" : ""}
            {stock.change?.toFixed(2) || "0.00"}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[12px] sm:text-xs md:text-sm
              ${isGainer
              ? "bg-gainBadgeBg text-gainBadgeText dark:text-gainBadgedarkText"
              : "bg-lossBadgeBg text-lossBadgeText dark:text-lossBadgeDarkText"
              }`}
          >
            {isGainer ? "+" : ""}
            {stock.percent?.toFixed(2) || "0.00"}%
          </span>
        </div>
        <div className="text-[12px] sm:text-xs text-paragraph dark:text-paragraphDark mt-1">
          VOL: {new Intl.NumberFormat().format(stock.volume)}
        </div>
      </div>
    </div>
  );
};

export default StockItem;
