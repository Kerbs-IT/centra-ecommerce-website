import { createContext,useState } from "react";


export const AuthContext = createContext(null);

export function AuthProvider({children}){
    
    // we will create two state for the user list and active user

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);


    // create the signup functionality 
    const signUp = ({ email,password})=>{
        if (users.some((u) => u.email === email)) return false;

      setUsers((prev) => [...prev, { email, password }]);
        
        return true;
    };

    const login = ({email,password}) => {
        const found = users.find((u) => u.email === email && u.password === password);

        if (!found) return false;
        const { password: _pw, ...safeUser } = found;

        setCurrentUser({...safeUser,passwordLength: _pw.length});

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

    
};