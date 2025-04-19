
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PostProvider } from "./contexts/PostContext";
import { AIAssistantProvider } from "./contexts/AIAssistantContext";

import Navigation from "./components/Navigation";
import AIAssistant from "./components/AIAssistant";

import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import CommunityPage from "./pages/CommunityPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Layout with navigation
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <div className="pt-16">{children}</div>
      <AIAssistant />
    </>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <PostProvider>
      <AIAssistantProvider>
        <Routes>
          <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <Layout>
                  <LearnPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Layout>
                  <CommunityPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Layout>
                  <ChatPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AIAssistantProvider>
    </PostProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
