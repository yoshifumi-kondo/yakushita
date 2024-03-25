import { getSession } from "next-auth/react";
import { IncomingHttpHeaders } from "http";
import { UserId } from "@/api/lib/domain";

export const getUserIdFromSession = async (
  request: Request
): Promise<UserId | null> => {
  const headers: IncomingHttpHeaders = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const session = await getSession({ req: { headers } });
  if (!session || !session.userId) {
    return null;
  }
  return new UserId(session.userId);
};
