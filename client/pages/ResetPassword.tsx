import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError("Invalid reset link. Please request a new password reset.");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          newPassword 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to reset password");
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
                Password Reset Complete!
              </CardTitle>
              <p className="text-white/70">
                Your password has been successfully updated
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  You can now log in with your new password. All existing sessions have been logged out for security.
                </p>
                
                <Link to="/login">
                  <Button className="forex-btn-primary w-full h-12 text-lg font-semibold">
                    Continue to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!token && error) {
    return (
      <div className="min-h-screen bg-crypto-dark flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 crypto-network-animation"></div>

        <Link
          to="/forgot-password"
          className="absolute top-6 left-6 text-white/80 hover:text-crypto-gold transition-colors flex items-center gap-2 z-20"
        >
          <ArrowLeft className="w-4 h-4" />
          Request New Reset
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
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Invalid Reset Link
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>

              <div className="text-center">
                <Link to="/forgot-password">
                  <Button className="forex-btn-primary w-full h-12 text-lg font-semibold">
                    Request New Password Reset
                  </Button>
                </Link>
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
              Set New Password
            </CardTitle>
            <p className="text-white/70">
              Enter your new password below
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
                <Label htmlFor="newPassword" className="text-white text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-forex-dark-100 border-forex-cyan/30 text-white placeholder:text-white/50 focus:border-forex-cyan focus:ring-forex-cyan h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-forex-cyan transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-forex-dark-100 border-forex-cyan/30 text-white placeholder:text-white/50 focus:border-forex-cyan focus:ring-forex-cyan h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-forex-cyan transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="text-sm text-white/60">
                Password must be at least 6 characters long
              </div>

              <Button
                type="submit"
                disabled={isLoading || !token}
                className="forex-btn-primary w-full h-12 text-lg font-semibold"
              >
                {isLoading ? "Updating Password..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm leading-relaxed">
            After updating your password, you'll need to log in again with your new credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
