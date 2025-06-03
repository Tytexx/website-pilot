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
      } else {
        // Optional: redirect to login
        router.push("/auth/signin");
      }
    }

    checkAuth();
  }, [router]);

  const [session, setSession] = useState<Object | null>(null);

  // useEffect(() => {
  //   // In a real app, you'd get the current user's username from auth context
  //   const currentUsername = "hussain_ak"; // Example username
  //   router.push(`/profile/${session.user.name}`);
  // }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse">Redirecting to your profile...</div>
    </div>
  );
}
