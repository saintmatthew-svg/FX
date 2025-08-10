import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login({ email, password });
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 crypto-network-animation"></div>

      <Link
        to="/"
        className="absolute top-6 left-6 text-white/80 hover:text-crypto-gold transition-colors flex items-center gap-2 z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="absolute top-6 right-6 flex items-center space-x-2 z-20">
        <div className="w-8 h-8 bg-crypto-gold rounded transform rotate-45"></div>
        <span className="text-xl font-bold text-white">
          CRYPTO
          <br />
          <span className="text-sm">FUTURE</span>
        </span>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <Card className="forex-card-gradient border-forex-cyan/20 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </CardTitle>
            <p className="text-white/70">Sign in to your trading account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-white text-sm font-medium"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-forex-dark-100 border-forex-cyan/30 text-black placeholder:text-black/50 focus:border-forex-cyan focus:ring-forex-cyan h-12"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-white text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-forex-dark-100 border-forex-cyan/30 text-black placeholder:text-black/50 focus:border-forex-cyan focus:ring-forex-cyan h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-forex-cyan transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    className="rounded border-forex-cyan/30 bg-forex-dark-100 text-forex-cyan focus:ring-forex-cyan"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-forex-cyan hover:text-forex-cyan/80 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="forex-btn-primary w-full h-12 text-lg font-semibold"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-forex-cyan/20"></div>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-white/70">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-forex-cyan hover:text-forex-cyan/80 font-semibold transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm leading-relaxed">
            By signing in, you agree to our{" "}
            <a href="#" className="text-forex-cyan hover:text-forex-cyan/80">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-forex-cyan hover:text-forex-cyan/80">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
