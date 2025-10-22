"use client";

import { useGetUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function DashboardGuard({ children }: Props) {
  const { data, isLoading } = useGetUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data && data.plan === null) {
      router.replace("/pricing");
    }
  }, [data, isLoading, router]);

  if (isLoading || (data && data.plan === null)) {
    return null;
  }

  return <>{children}</>;
}
