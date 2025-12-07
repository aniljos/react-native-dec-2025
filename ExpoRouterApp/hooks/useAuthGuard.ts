import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export const useAuthGuard = () => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [auth.isAuthenticated, router]);

  return auth;
};
