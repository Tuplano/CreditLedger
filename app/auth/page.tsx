"use client";

import { login, signup, forgotPassword, googleSignIn } from "./action";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import InputField from "@/components/ui/InputField";
import { toast, Toaster } from "sonner";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Controlled input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleLogin(formData: FormData) {
    const res = await login(formData);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Logged in successfully!");
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-white">
      <Toaster />
      <div className="max-w-md w-full space-y-8">
        {/* Toggle login/signup */}
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${isLogin ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(true)}
            type="button"
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded ${!isLogin ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(false)}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow border">
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
                  className="absolute right-3 top-[38px]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                formAction={handleForgotPassword}
                className="text-sm text-black hover:text-gray-700"
              >
                Forgot password?
              </button>

              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-4 bg-gray-800 text-white rounded-lg"
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
                  className="absolute right-3 top-[38px]"
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
                  className="absolute right-3 top-[38px]"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-4 bg-gray-300 text-black rounded-lg"
              >
                <span>Create Account</span>
                <ArrowRight size={20} className="ml-2" />
              </button>
            </form>
          )}

          <div className="my-4 flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-400 rounded-lg hover:bg-gray-100"
          >
            <img src="/google-logo.svg" alt="Google" className="h-5 w-5 mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
