import {
	FromTo,
	Language,
	LanguagesType,
	Original,
	Text,
	TranslationConfig,
} from "@/api/lib/domain";
import { translationService } from "@/api/service";

export async function POST(request: Request) {
	const req = await request.json();
	const result = await translationService.translate(
		// TODO: Use request value
		new Original(new Text(req.text), new Language(LanguagesType.JAPANESE)),
		new TranslationConfig(
			// TODO: Use request value
			new FromTo(
				new Language(LanguagesType.JAPANESE),
				new Language(LanguagesType.ENGLISH),
			),
		),
	);
	return Response.json({ translated: result.toJSON().translated.text });
}

async function translate(text: string) {
	await sleep(1000);
	return "translated: " + text;
}

async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
