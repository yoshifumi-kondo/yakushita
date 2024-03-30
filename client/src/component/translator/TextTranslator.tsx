"use client";
import { useDebounce } from "@/utils/useDebounce";
import { useEffect, useRef, useState } from "react";
import { LanguageSelector } from "@/component/translator/LanguageSelector";
import { InputTextArea } from "@/component/translator/InputTextArea";
import { TranslatedText } from "@/component/translator/TranslatedText";

export const TextTranslator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState<"ja" | "en">("ja");
  const [targetLanguage, setTargetLanguage] = useState<"ja" | "en">("en");
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
          body: JSON.stringify({
            text: debouncedInputText,
            from: sourceLanguage,
            to: targetLanguage,
          }),
        });
        const res = await response.json();
        setTranslatedText(res.translated);
      }
    };
    translateText();
  }, [debouncedInputText, sourceLanguage, targetLanguage]);

  const handleInputTextChange = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <LanguageSelector
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onChangeSource={setSourceLanguage}
          onChangeTarget={setTargetLanguage}
        />
        <div className="mb-4">
          <InputTextArea
            inputText={inputText}
            onChange={handleInputTextChange}
          />
        </div>
        <div className="mb-4">
          <TranslatedText translatedText={translatedText} />
        </div>
      </div>
    </div>
  );
};
