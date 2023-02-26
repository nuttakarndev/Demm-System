import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  return <>{user ? children : null}</>;
}
