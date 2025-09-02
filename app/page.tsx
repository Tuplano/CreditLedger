import {
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  BarChart3,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 w-full">
          <div className="w-full text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Manage Your Credit
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Intelligently
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Track transactions, monitor credit limits, and gain insights into
              your financial health with our comprehensive credit ledger
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                Start Free Trial
              </a>
              <a
                href="#features"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-all font-semibold"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 p-20 bg-white w-full">
          <div className="w-full grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="Real-time Analytics"
              description="Get instant insights into your credit usage patterns, trends, and financial health with interactive dashboards."
              bgGradient="from-blue-50 to-blue-100"
              iconBg="bg-blue-600"
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Bank-level Security"
              description="Your financial data is protected with enterprise-grade encryption and multi-factor authentication."
              bgGradient="from-purple-50 to-purple-100"
              iconBg="bg-purple-600"
            />
            <FeatureCard
              icon={<TrendingUp size={24} />}
              title="Smart Predictions"
              description="AI-powered forecasting helps you predict future credit needs and optimize your financial planning."
              bgGradient="from-green-50 to-green-100"
              iconBg="bg-green-600"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 p-20 bg-gray-50 w-full">
          <div className="w-full grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why choose CreditLedger?
              </h2>
              <Benefit
                title="Automated Tracking"
                description="Automatically categorize and track all your credit transactions without manual entry."
              />
              <Benefit
                title="Credit Limit Monitoring"
                description="Stay informed about your credit utilization with real-time alerts and recommendations."
              />
              <Benefit
                title="Multi-Account Support"
                description="Manage multiple credit accounts from a single, unified dashboard."
              />
            </div>

            {/* Test placeholder icon only */}
            <div className="bg-white p-8 rounded-2xl shadow-xl flex justify-center items-center">
              <div className="inline-block p-6 bg-blue-100 rounded-full">
                <Users className="text-blue-600" size={48} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 w-full">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to take control of your credit?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who are already managing their credit
              smarter with CreditLedger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                Get Started Free
              </a>
              <a
                href="/dashboard"
                className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all font-semibold"
              >
                View Dashboard
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// --- Feature Card Component ---
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgGradient: string;
  iconBg: string;
}

function FeatureCard({
  icon,
  title,
  description,
  bgGradient,
  iconBg,
}: FeatureCardProps) {
  return (
    <div
      className={`p-8 rounded-2xl bg-gradient-to-br ${bgGradient} hover:shadow-lg transition-all`}
    >
      <div
        className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// --- Benefit Component ---
interface BenefitProps {
  title: string;
  description: string;
}

function Benefit({ title, description }: BenefitProps) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <CheckCircle className="text-green-600 mt-1" size={24} />
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
