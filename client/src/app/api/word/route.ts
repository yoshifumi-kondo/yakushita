import { getSession } from "next-auth/react";
import { UserId } from "@/api/lib/domain";
import { IncomingHttpHeaders } from "http";
import { GetTopWordsUsecase } from "@/api/usecase/translate/GetTopWordsUsecase";

export async function GET(request: Request) {
  const headers: IncomingHttpHeaders = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const session = await getSession({ req: { headers } });
  if (!session || !session.userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const result = await GetTopWordsUsecase(new UserId(session.userId));
  const topWordList = result.toJSON();
  return new Response(JSON.stringify(topWordList), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
