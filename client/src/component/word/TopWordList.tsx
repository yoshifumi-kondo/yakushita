"use client";
import { useEffect, useState } from "react";

export const TopWordList = () => {
  const [topWords, setTopWords] = useState([]);
  useEffect(() => {
    const fetchTopWords = async () => {
      const response = await fetch("/api/word");
      const res = await response.json();
      setTopWords(res);
    };
    fetchTopWords();
  }, []);

  return (
    <div className=" bg-white w-full h-full flex flex-col">
      <h1 className="text-xl font-bold mb-4 text-gray-800 sticky top-0 bg-white w-100 p-4">
        Top 100 Words
      </h1>
      <ul className="space-y-3 overflow-y-auto flex-1 p-4">
        {topWords.map(({ word: { text, partOfSpeech }, count }, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-3 gap-4"
          >
            <span className="text-sm font-medium text-gray-700 w-6">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-gray-700 flex-1">
              {text}
            </span>
            <span className="text-xs font-medium text-gray-400">
              {partOfSpeech}
            </span>
            <span className="text-sm font-semibold text-green-500 w-8 text-center">
              {count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
