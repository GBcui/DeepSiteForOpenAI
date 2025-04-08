import React from "react";
import { MdRefresh } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";

// import Logo from "@/assets/logo.svg";

function Header({
  onReset,
  onDownload,
  children,
}: {
  onReset: () => void;
  onDownload: () => void;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex h-[50px] lg:h-[54px] items-center justify-between px-3 lg:px-4 border-b border-gray-800 select-none">
      <div className="flex items-center gap-2 lg:gap-3">
        <img
          src="/logo.svg"
          alt="logo"
          className="size-6 lg:size-7 filter invert"
        />
        <h1 className="text-white font-medium text-sm lg:text-base">
          DeepSite
        </h1>
      </div>
      <div className="flex items-center justify-end gap-2 lg:gap-3">
        {children}
        <button
          title="Download HTML"
          className="flex-none flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors duration-100"
          onClick={onDownload}
        >
          <FaDownload className="text-base lg:text-lg" />
        </button>
        <button
          title="Reset Editor"
          className="flex-none flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-100"
          onClick={onReset}
        >
          <MdRefresh className="text-lg lg:text-xl" />
        </button>
      </div>
    </header>
  );
}

export default Header;
