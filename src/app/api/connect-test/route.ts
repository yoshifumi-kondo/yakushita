import { GoogleAuth, UserAuth } from "@/api/lib/domain";
import { GoogleAuthId } from "@/api/lib/domain/user/auth/GoogleAuthId";
import { userService } from "@/api/service";
import { generateId } from "@/api/utils/generateUlid";

export async function POST() {
  console.log("POST /api/connect-test");
  const auth = new UserAuth({
    google: new GoogleAuth(new GoogleAuthId(generateId())),
  });
  await userService.create(auth);
  return new Response("OK", { status: 200 });
}
