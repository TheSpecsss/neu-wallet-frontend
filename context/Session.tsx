import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
} from "react";
import type { User } from "../api/graphql/codegen/graphql";
import * as SecureStore from "expo-secure-store";
import { useGetUserQuery } from "../hooks/query/useGetUserQuery";
import type { QueryClient } from "@tanstack/react-query";

type SessionContextType = {
  user?: User;
  setSession: (token: string, expires: Date) => Promise<void>;
  clearSession: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export const SessionProvider = ({
  queryClient,
  children,
}: {
  queryClient: QueryClient;
  children: ReactNode;
}) => {
  const { data } = useGetUserQuery();

  const setSession = async (token: string, expires: Date) => {
    await SecureStore.setItemAsync("userToken", token);
    await SecureStore.setItemAsync("expiresAt", expires.getTime().toString());
    await queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const clearSession = async () => {
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("expiresAt");
    await queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      const expiresAt = await SecureStore.getItemAsync("expiresAt");

      if (token && expiresAt) {
        const expires = new Date(expiresAt).getTime();
        if (expires > Date.now()) {
          await queryClient.invalidateQueries({ queryKey: ["user"] });
        }
      }
    };

    fetchUser();
  }, [queryClient.invalidateQueries]);

  return (
    <SessionContext.Provider
      value={{
        user: data,
        setSession,
        clearSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
