'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() =>
        new QueryClient()
    );
    const trpcClient = trpc.createClient({
        links: [
            httpBatchLink({
                url: "http://localhost:3000/api/trpc",
            }),
        ],
    });
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};