
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Question from "./pages/Question";
import MixPractice from "./pages/MixPractice";
import Practice from "./pages/Practice";
import MixPracticeReport from "./pages/MixPracticeReport";
import CreateMix from "./pages/CreateMix";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1">
              <SidebarTrigger />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/question/:id" element={<Question />} />
                <Route path="/mix-practice/:id" element={<MixPractice />} />
                <Route path="/practice/:id" element={<Practice />} />
                <Route path="/mix-practice-report/:id" element={<MixPracticeReport />} />
                <Route path="/create-mix" element={<CreateMix />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
