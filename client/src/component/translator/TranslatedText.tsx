import type { FC } from "react";

export const TranslatedText: FC<{ translatedText: string }> = ({
  translatedText,
}) => {
  return (
    <div className="w-full p-4 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300">
      {translatedText}
    </div>
  );
};
