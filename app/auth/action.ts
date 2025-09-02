"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) return { error: error.message };

  return { success: true }; // no redirect here
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) return { error: error.message };

  return { success: true }; // no redirect here
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset`,
  });

  if (error) return { error: error.message };

  return { success: true };
}

export async function googleSignIn() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) return { error: error.message };

  return { url: data.url };
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) return { error: error.message };

  return { success: true }; // no redirect
}
