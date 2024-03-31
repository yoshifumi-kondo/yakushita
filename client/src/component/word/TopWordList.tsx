"use client";
import { LemmatizationList } from "@/component/word/LemmatizationList";
import { useEffect, useState } from "react";

export const TopWordList = () => {
  const [topWords, setTopWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState<{
    text: string;
    partOfSpeech: string;
  } | null>(null);
  const [isSentenceListHovered, setIsSentenceListHovered] = useState(false);

  useEffect(() => {
    const fetchTopWords = async () => {
      const response = await fetch("/api/word-usage/top-used-list");
      const res = await response.json();
      setTopWords(res);
    };
    fetchTopWords();
  }, []);

  const handleWordHover = (word: { text: string; partOfSpeech: string }) => {
    setSelectedWord(word);
  };

  const handleWordLeave = () => {
    if (!isSentenceListHovered) {
      setSelectedWord(null);
    }
  };

  const handleSentenceListHover = () => {
    setIsSentenceListHovered(true);
  };

  const handleSentenceListLeave = () => {
    setIsSentenceListHovered(false);
    setSelectedWord(null);
  };

  return (
    <div className="bg-white w-full h-full flex relative">
      <div className="w-full flex flex-col p-4">
        <h1 className="text-xl font-bold mb-4 text-gray-800 sticky top-0 bg-white w-100">
          Top 100 Words
        </h1>
        <ul className="space-y-3 overflow-y-auto flex-1">
          {topWords.map(({ word: { text, partOfSpeech }, count }, index) => (
            <li
              key={`${text}-${partOfSpeech}`}
              className="flex justify-between items-center border-b border-gray-200 pb-3 gap-4 cursor-pointer relative z-10"
              onMouseEnter={() => handleWordHover({ text, partOfSpeech })}
              onMouseLeave={handleWordLeave}
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
      {selectedWord && (
        <div
          className="absolute top-0 left-full w-full max-w-96 h-full bg-white shadow-lg p-4 z-0 -ml-4"
          onMouseEnter={handleSentenceListHover}
          onMouseLeave={handleSentenceListLeave}
        >
          <LemmatizationList
            word={selectedWord.text}
            partOfSpeech={selectedWord.partOfSpeech}
          />
        </div>
      )}
    </div>
  );
};
