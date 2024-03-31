import { getTopUsedList } from "@/api/feature/wordUsage/usecase";
import { getUserIdFromSession } from "@/api/utils/getUserIdFromSession";

export async function GET(request: Request) {
  const userId = await getUserIdFromSession(request);
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const result = await getTopUsedList.execute(userId);
  const topWordList = result.toJSON();
  return new Response(JSON.stringify(topWordList), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
