"use client";
import { useDebounce } from "@/utils/useDebounce";
import { useEffect, useRef, useState } from "react";

export const TextTranslator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const isFirstRender = useRef(true);
  const debouncedInputText = useDebounce(inputText, 500);
  useEffect(() => {
    // Not to call translate api for the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const translateText = async () => {
      if (debouncedInputText) {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: debouncedInputText }),
        });
        const res = await response.json();
        setTranslatedText(res.translated);
      }
    };
    translateText();
  }, [debouncedInputText]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="mb-4">
          <textarea
            className="w-full p-4 text-base text-gray-900 bg-white rounded-lg shadow border border-gray-300 focus:outline-none focus:border-blue-500"
            rows={4}
            placeholder="Type to translate."
            value={inputText}
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <div className="w-full p-4 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300">
            {translatedText}
          </div>
        </div>
      </div>
    </div>
  );
};
