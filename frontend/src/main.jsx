import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/contexts/AuthContext.jsx";
import "./index.css";

import Router from "./router.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>

);
