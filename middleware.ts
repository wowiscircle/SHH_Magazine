import { NextRequest, NextResponse } from "next/server";

function decodeCredentials(header: string | null): [string, string] | null {
  if (!header?.startsWith("Basic ")) return null;

  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;
    return [decoded.slice(0, separator), decoded.slice(separator + 1)];
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const user = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  // Fail closed: an unconfigured deployment must never expose the dashboard.
  if (!user || !password) {
    return new NextResponse("管理介面尚未設定存取驗證。", { status: 503 });
  }

  const credentials = decodeCredentials(request.headers.get("authorization"));
  if (credentials?.[0] === user && credentials[1] === password) {
    return NextResponse.next();
  }

  return new NextResponse("需要管理者驗證", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="SHH Magazine Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = { matcher: ["/admin/:path*"] };
