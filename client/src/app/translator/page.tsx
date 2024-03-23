import { TextTranslator } from "@/component/translator/TextTranslator";
import { TopWordList } from "@/component/word/TopWordList";

export default function Translator() {
  return (
    <div className="flex h-screen">
      <div className="w-80">
        <TopWordList />
      </div>
      <div className="flex-1">
        <TextTranslator />
      </div>
    </div>
  );
}
