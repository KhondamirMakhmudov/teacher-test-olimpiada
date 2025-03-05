import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import reactQueryClient from "@/config/react-query";
import { SessionProvider } from "next-auth/react";
import i18 from "@/services/i18n";
// import { useTranslation } from "react-i18next";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = useState(() => reactQueryClient);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <Component {...pageProps} />

          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
