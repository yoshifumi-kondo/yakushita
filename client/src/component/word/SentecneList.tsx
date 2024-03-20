"use client";
import { FC, useEffect, useState } from "react";

export const SentenceList: FC<{ word: string; partOfSpeech: string }> = ({
  word,
  partOfSpeech,
}) => {
  const [sentenceList, setSentenceList] = useState<{ text: string }[]>([]);

  useEffect(() => {
    const fetchSentences = async () => {
      const queryParams = new URLSearchParams();
      if (word) {
        queryParams.append("word", word);
      }
      if (partOfSpeech) {
        queryParams.append("partOfSpeech", partOfSpeech);
      }
      if (!word && !partOfSpeech) {
        return;
      }
      const response = await fetch(`/api/sentence?${queryParams.toString()}`);
      const res = await response.json();
      setSentenceList(res);
    };
    fetchSentences();
  }, [word, partOfSpeech]);

  return (
    <div className="bg-white w-full h-full flex flex-col">
      <h1 className="text-xl font-bold mb-4 text-gray-800 sticky top-0 bg-white w-100 p-4">
        Sentences
      </h1>
      <ul className="space-y-3 overflow-y-auto flex-1 p-4">
        {sentenceList.map(({ text }, index) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
};
