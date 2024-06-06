import { createContext, ReactNode, useEffect, useState } from "react";
import { authConfig } from "@/config/authConfig";

const defaultProvider: any = {
  local_storage: () => Promise.resolve(),
};

const StorageContext = createContext(defaultProvider);

export type Props = {
  children: ReactNode;
};

const StorageProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);

  const local_storage = async (): Promise<void> => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem(authConfig.accessToken);
      if (storedToken) {
        setToken(storedToken);
      }
    }
  };

  useEffect(() => {
    local_storage();
  }, []);

  console.log(token,'token')

  return (
    <StorageContext.Provider value={{ token }}>
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };

