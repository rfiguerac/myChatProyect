// src/routes/dashboard.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";

import Dashboard from "@/pages/dashboard/DashboardPage";
import { useAuthStore } from "@/store/authStore";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    const { user } = useAuthStore.getState();
    if (!user) {
      throw redirect({ to: "/" });
    }
    return context;
  },
  component: Dashboard,
});
