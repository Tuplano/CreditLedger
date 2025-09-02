"use client";

import { login, signup, forgotPassword, googleSignIn } from "./action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { ArrowRight, Eye, EyeOff, DollarSign } from "lucide-react";
import InputField from "@/components/ui/InputField";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleLogin(formData: FormData) {
    const res = await login(formData);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Logged in successfully!");
      window.location.href = "/dashboard";
    }
  }

  async function handleSignup(formData: FormData) {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const res = await signup(formData);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Account created successfully!");
      router.push("/dashboard");
    }
  }

  async function handleForgotPassword(formData: FormData) {
    const res = await forgotPassword(formData);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Password reset email sent!");
    }
  }

  async function handleGoogleSignIn() {
    const res = await googleSignIn();
    if (res.error) {
      toast.error(res.error);
    } else if (res.url) {
      window.location.href = res.url;
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Toaster />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Branding */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CreditLedger
          </h1>
          <p className="text-gray-600">
            {isLogin
              ? "Welcome back! Sign in to your account"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Toggle login/signup */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-xl flex">
            <button
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setIsLogin(true)}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                !isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setIsLogin(false)}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm">
          {isLogin ? (
            <form action={handleLogin} className="space-y-6">
              <InputField
                label="Email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <div className="relative">
                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  formAction={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-700 transition font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] font-semibold shadow-lg"
              >
                <span>Sign In</span>
                <ArrowRight size={20} className="ml-2" />
              </button>
            </form>
          ) : (
            <form action={handleSignup} className="space-y-6">
              <InputField
                label="Email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <div className="relative">
                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-[1.02] font-semibold shadow-lg"
              >
                <span>Create Account</span>
                <ArrowRight size={20} className="ml-2" />
              </button>
            </form>
          )}

          <div className="my-6 flex items-center">
            <hr className="flex-1 border-gray-200" />
            <span className="mx-4 text-gray-400 text-sm font-medium">
              or continue with
            </span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all group"
          >
            <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium group-hover:text-gray-900 transition">
              Continue with Google
            </span>
          </button>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 transition"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 transition"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
