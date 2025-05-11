"use client";

import Dashboard from "@/components/Dashboard";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <main className="relative pt-6">
      <Dashboard />
      <Toaster />
    </main>
  );
}
