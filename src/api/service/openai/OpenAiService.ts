import OpenAI from "openai";

export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  public async askGptV3_5Turbo(textPrompt: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "system", content: textPrompt }],
      model: "gpt-3.5-turbo",
    });

    const answer = completion.choices[0].message.content;

    if (!answer) throw new Error("Translation failed");

    return answer;
  }
}
