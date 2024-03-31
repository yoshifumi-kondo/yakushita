import React, { type FC, useState } from "react";

export const LanguageSelector: FC<{
  sourceLanguage: "ja" | "en";
  targetLanguage: "ja" | "en";
  onChangeSource: (language: "ja" | "en") => void;
  onChangeTarget: (language: "ja" | "en") => void;
}> = ({ sourceLanguage, targetLanguage, onChangeSource, onChangeTarget }) => {
  const languageOptions = {
    ja: "Japanese",
    en: "English",
  };

  const switchLanguages = () => {
    onChangeSource(targetLanguage);
    onChangeTarget(sourceLanguage);
  };

  return (
    <div className="flex justify-center items-center my-4 text-gray-900">
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={sourceLanguage}
        onChange={(e) => onChangeSource(e.target.value as "ja" | "en")}
      >
        {Object.entries(languageOptions).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="mx-2 text-gray-700 font-semibold p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        onClick={switchLanguages}
      >
        ⇄
      </button>

      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={targetLanguage}
        onChange={(e) => onChangeTarget(e.target.value as "ja" | "en")}
      >
        {Object.entries(languageOptions).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
