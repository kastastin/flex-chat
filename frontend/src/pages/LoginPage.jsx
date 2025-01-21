import {
  Eye,
  Mail,
  Lock,
  EyeOff,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

import AuthImagePattern from "../components/AuthImagePattern";

export default function LoginPage() {
  const { isLoadingLogIn, login } = useAuthStore();

  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    login(formData);
  }

  return (
    <div className="grid h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h1 className="mt-2 text-2xl font-bold">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setIsPasswordHidden((val) => !val)}
                >
                  {isPasswordHidden ? (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoadingLogIn}
            >
              {isLoadingLogIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
}
