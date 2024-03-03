import OpenAI from "openai";

export class OpenAiService {
  private openai: OpenAI;
  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    this.openai = new OpenAI({ apiKey });
  }
  public async askGptV3_5Turbo(textPrompt: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "system", content: textPrompt }],
      model: "gpt-3.5-turbo",
    });
    if (!completion.choices || completion.choices.length === 0) {
      throw new Error(
        `No completion choices found for text prompt: ${textPrompt}`
      );
    }
    const answer = completion.choices[0].message.content;
    if (!answer) {
      throw new Error(`Translation failed for text prompt: ${textPrompt}`);
    }
    return answer;
  }
}
