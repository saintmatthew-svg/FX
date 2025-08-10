import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Accounts from "./pages/Accounts";
import About from "./pages/About";
import Trading from "./pages/TradingNew";
import Platforms from "./pages/Platforms";
import Tools from "./pages/Tools";
import Education from "./pages/Education";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Staking from "./pages/Staking";
import News from "./pages/News";
import TestPage from "./pages/TestPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/trading" element={<Trading />} />
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Portfolio />
                </ProtectedRoute>
              } />
              <Route path="/staking" element={
                <ProtectedRoute>
                  <Staking />
                </ProtectedRoute>
              } />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/education" element={<Education />} />
              <Route path="/news" element={<News />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
