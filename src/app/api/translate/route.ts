export async function POST(request: Request) {
  const req = await request.json();
  const translated = await translate(req.text);
  return Response.json({ originalText: req.text, translatedText: translated });
}

async function translate(text: string) {
  await sleep(1000);
  return "translated: " + text;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
