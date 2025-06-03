"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

// This is a redirect page that sends users to their own profile
export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const currentSession = await getSession();
      if (currentSession) {
        setSession(currentSession);
        const username = currentSession.user.name;
        router.push(`/profile/${username}`);
        console.log(username);
      }
    }

    checkAuth();
  }, [router]);

  const [session, setSession] = useState<Object | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse">Redirecting to your profile...</div>
    </div>
  );
}
