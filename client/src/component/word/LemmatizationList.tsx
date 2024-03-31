"use client";
import { type FC, useEffect, useState } from "react";

export const LemmatizationList: FC<{ word: string; partOfSpeech: string }> = ({
  word,
  partOfSpeech,
}) => {
  const [lemmatizationList, setLemmatizationList] = useState<
    {
      source: { text: string; language: string };
      wordList: { text: string; partOfSpeech: string; language: string }[];
      id: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchLemmatization = async () => {
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
      const response = await fetch(
        `/api/lemmatization/getListByWord?${queryParams.toString()}`
      );
      const res = await response.json();
      setLemmatizationList(res);
    };
    fetchLemmatization();
  }, [word, partOfSpeech]);

  return (
    <div className="bg-white w-full h-full flex flex-col">
      <h1 className="text-xl font-bold mb-4 text-gray-800 sticky top-0 bg-white w-100 p-4">
        Sentences
      </h1>
      <ul className="space-y-3 overflow-y-auto flex-1 p-4">
        {lemmatizationList.map(({ source, id }, index) => (
          <li
            key={id}
            className="flex justify-between items-center border-b border-gray-200 pb-3 gap-4"
          >
            <span className="text-sm font-medium text-gray-700 w-6">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-gray-700 flex-1">
              {source.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
