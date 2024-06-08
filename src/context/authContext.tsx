import React, { useState, createContext, useContext, ReactNode } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 
import { signIn, signOut } from "next-auth/react";

interface IAuthContextProps {
  login: (formData: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  userData: any; // Replace `any` with a specific type if possible
  setUserData: React.Dispatch<React.SetStateAction<any>>; // Replace `any` with a specific type if possible
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: (error: string) => void;
}

export const authContext = createContext<IAuthContextProps>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  userData: null,
  setUserData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: "",
  setError: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null); // Replace `any` with a specific type if possible
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (formData: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError("");

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.replace("/dashboard");
      }
    } catch (error: any) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      setUserData(null);
      toast.success("Logged out successfully!");
      router.replace("/login");
    } catch (error: any) {
      toast.error("Failed to logout");
    }
  };

  return (
    <authContext.Provider
      value={{
        userData,
        setUserData,
        login,
        logout,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
