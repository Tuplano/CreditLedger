// app/auth/callback/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }
  const redirectTo = process.env.NEXT_PUBLIC_SITE_URL;
  return NextResponse.redirect(`${redirectTo}/dashboard`);
}
