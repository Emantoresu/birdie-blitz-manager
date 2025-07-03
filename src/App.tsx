
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Members } from "./pages/Members";
import { CourtBooking } from "./pages/CourtBooking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/booking" element={<CourtBooking />} />
            <Route path="/events" element={<div className="p-8"><h1 className="text-3xl font-bold">Events - Coming Soon</h1></div>} />
            <Route path="/statistics" element={<div className="p-8"><h1 className="text-3xl font-bold">Statistics - Coming Soon</h1></div>} />
            <Route path="/settings" element={<div className="p-8"><h1 className="text-3xl font-bold">Settings - Coming Soon</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
