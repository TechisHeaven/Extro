"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TemplateProps {
  children: React.ReactNode;
}
export default function Template({ children }: TemplateProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
