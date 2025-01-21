import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthStore } from "./store/useAuthStore";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const { authUser, isLoadingCheckAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  console.log(authUser);

  if (isLoadingCheckAuth && !authUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}
