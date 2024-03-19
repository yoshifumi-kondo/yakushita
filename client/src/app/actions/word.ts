import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/nextAuth/authOptions";
import { UserId } from "@/api/lib/domain";
import { GetTopWordsUsecase } from "@/api/usecase/translate/GetTopWordsUsecase";
import { NextApiRequest, NextApiResponse } from "next";

export async function getTopWord(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.userId) {
    return null;
  }
  const result = await GetTopWordsUsecase(new UserId(session.userId));
  return result.toJSON();
}
