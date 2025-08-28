// middleware.ts (root)
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Only protect /dashboard
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            // Update cookies on response
          } catch {}
        },
        remove(name: string, options: any) {
          try {
            // Remove cookies on response
          } catch {}
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  // Redirect to /auth if not logged in
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Optionally restrict middleware to only run on dashboard path
export const config = {
  matcher: ["/dashboard/:path*"], // only runs middleware on /dashboard and subpaths
};
