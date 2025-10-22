"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const authPages = ["/auth/login", "/auth/register", "/auth/verification"];

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("auth_token_x");

    // Redirect authenticated users away from auth pages
    if (token && authPages.some((path) => pathname.startsWith(path))) {
      router.replace("/"); // Redirect to home page
    }
  }, [pathname, router]);

  return <>{children}</>;
}
