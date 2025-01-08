"use client";

import React from "react";

type KeydownListener = Parameters<typeof window.addEventListener<"keydown">>[1];
interface DirectoryProps {
  fileNames: string[];
}
const Directory: React.FC<DirectoryProps> = ({ fileNames }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  React.useEffect(() => {
    const handleKeyDown: KeydownListener = (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < fileNames.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
        case "ArrowRight":
          if (selectedIndex > -1) {
            window.location.href = `/PDFs/${fileNames[selectedIndex]}`;
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fileNames, selectedIndex]);

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {fileNames.map((fileName, index) => (
        <li key={fileName}>
          <a
            className={`block p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600
              dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 ${
                selectedIndex === index
                  ? "bg-gray-50 dark:bg-gray-700"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            href={`/PDFs/${fileName}`}
            tabIndex={0}
            onFocus={() => setSelectedIndex(index)}
          >
            {fileName}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Directory;
