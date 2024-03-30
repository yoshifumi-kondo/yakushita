import type { FC } from "react";

export const InputTextArea: FC<{
  inputText: string;
  onChange: (text: string) => void;
}> = ({ inputText, onChange }) => {
  return (
    <textarea
      className="w-full p-4 text-base text-gray-900 bg-white rounded-lg shadow border border-gray-300 focus:outline-none focus:border-blue-500"
      rows={4}
      placeholder="Type to translate."
      value={inputText}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
