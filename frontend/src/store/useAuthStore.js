import { create } from "zustand";
import toast from "react-hot-toast";

import axios from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoadingCheckAuth: true,
  isLoadingLogIn: false,
  isLoadingSignUp: false,
  isLoadingUpdateProfile: false,

  checkAuth: async () => {
    try {
      const res = await axios.get("auth/check");

      set({ authUser: res.data });
    } catch (err) {
      console.log("❌ Error in useAuthStore -> checkAuth", err);
      set({ authUser: null });
    } finally {
      set({ isLoadingCheckAuth: false });
    }
  },

  signup: async (data) => {
    set({ isLoadingSignUp: true });
    try {
      const res = await axios.post("auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoadingSignUp: false });
    }
  },

  login: async (data) => {
    set({ isLoadingLogIn: true });
    try {
      const res = await axios.post("auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoadingLogIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axios.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
