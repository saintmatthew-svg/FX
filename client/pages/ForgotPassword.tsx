import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, CheckCircle, Mail } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to send reset email");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-crypto-dark flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 crypto-network-animation"></div>

        <Link
          to="/login"
          className="absolute top-6 left-6 text-white/80 hover:text-crypto-gold transition-colors flex items-center gap-2 z-20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
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
              <div className="w-16 h-16 bg-crypto-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-crypto-green" />
              </div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Email Sent!
              </CardTitle>
              <p className="text-white/70">
                We've sent a password reset link to your email address
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="bg-crypto-dark-100 rounded-lg p-4 mb-4">
                  <Mail className="w-6 h-6 text-crypto-gold mx-auto mb-2" />
                  <p className="text-white text-sm">{email}</p>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Please check your email and click the reset link to set a new password. 
                  The link will expire in 1 hour for security reasons.
                </p>
              </div>

              <div className="space-y-3">
                <Link to="/login">
                  <Button className="forex-btn-primary w-full h-12 text-lg font-semibold">
                    Back to Login
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="bg-forex-dark-100 border-forex-cyan/30 text-white hover:bg-forex-cyan/10 w-full h-12"
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                >
                  Send Another Email
                </Button>
              </div>

              <div className="text-center pt-4">
                <p className="text-white/60 text-sm">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setEmail("");
                    }}
                    className="text-forex-cyan hover:text-forex-cyan/80 underline"
                  >
                    try again
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crypto-dark flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 crypto-network-animation"></div>

      <Link
        to="/login"
        className="absolute top-6 left-6 text-white/80 hover:text-crypto-gold transition-colors flex items-center gap-2 z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
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
              Reset Password
            </CardTitle>
            <p className="text-white/70">
              Enter your email address and we'll send you a link to reset your password
            </p>
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
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-forex-dark-100 border-forex-cyan/30 text-white placeholder:text-white/50 focus:border-forex-cyan focus:ring-forex-cyan h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="forex-btn-primary w-full h-12 text-lg font-semibold"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-white/70">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-forex-cyan hover:text-forex-cyan/80 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm leading-relaxed">
            This is a secure process. We'll never share your email address or send you spam.
          </p>
        </div>
      </div>
    </div>
  );
}
