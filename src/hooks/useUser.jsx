import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const login = (userData, expiresIn) => {

    // 07-01-2024
    const expirationTime = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem('expirationTime', expirationTime.toString());
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;