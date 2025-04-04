"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

// userを入れる箱の型
type UserContextType = {
  user: User | null;
};

// 空の箱を作る
const UserContext = createContext<UserContextType>({ user: null });

// 実際に user を監視して中に入れる
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // ログイン状態が変わると自動で更新される！
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// 他のページで使うための関数
export const useUser = () => useContext(UserContext);


