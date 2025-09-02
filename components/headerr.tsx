import { ArrowRight, DollarSign } from "lucide-react";
import { HeaderProps } from "@/types/all";

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <DollarSign className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">CreditLedger</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
              <ArrowRight size={16} />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Sign In
              </a>
              <a
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
