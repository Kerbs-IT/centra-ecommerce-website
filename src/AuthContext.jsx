import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // we will create two state for the user list and active user

  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("users")) ?? [];
    } catch {
      return [];
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) ?? null;
    } catch {
      return null;
    }
  });

  // save whenever they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // add another useEffect for the currentUser so when there's a user set the local current user else remove it
  // from the localstorage

  useEffect(() => {
    if (currentUser)
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    else localStorage.removeItem("currentUser");
  }, [currentUser]);

  // create the signup functionality
  const signUp = ({ email, password }) => {
    if (users.some((u) => u.email === email)) return false;

    const id = crypto.randomUUID();

    setUsers((prev) => [...prev, { id, email, password }]);
    setCurrentUser({ id, email, passwordLength: password.length });

    return true;
  };

  const login = ({ email, password }) => {
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found) return false;

    const { password: pw, ...rest } = found; // rest = { id, email }
    setCurrentUser({ ...rest, passwordLength: pw.length });

    return true;
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isAuth: !!currentUser,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
