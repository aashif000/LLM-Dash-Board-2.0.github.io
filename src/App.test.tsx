
import React from 'react';
import { useQuery } from 'react-query';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import { AppSidebar } from "./components/app-sidebar"; 

const fetchData = async () => {
  const res = await fetch('/api/data');
  return res.json();
};

const App = () => {
  const { data, isLoading, error } = useQuery('data', fetchData);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return <div>{data}</div>;
};

export default App;

import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.tsx';

test('renders loading and data', async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  // Check if loading is displayed
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for the data to be loaded
  await waitFor(() => screen.getByText(/data/i));

  // Check if data is displayed
  expect(screen.getByText(/data/i)).toBeInTheDocument();
});
