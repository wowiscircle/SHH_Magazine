import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const user = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) return new NextResponse("管理介面尚未設定存取驗證。", { status: 503 });
  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const [givenUser, givenPassword] = atob(header.slice(6)).split(":");
    if (givenUser === user && givenPassword === password) return NextResponse.next();
  }
  return new NextResponse("需要管理者驗證", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="SHH Magazine Admin", charset="UTF-8"', "Cache-Control": "no-store" } });
}
export const config = { matcher: ["/admin/:path*"] };
