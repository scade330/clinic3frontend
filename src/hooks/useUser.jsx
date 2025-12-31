import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user from backend using JWT cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/user/me", {
          withCredentials: true, // important to send cookie
        });
        setUser(data.user || data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function: update state
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/api/user/logout-user", {}, { withCredentials: true });
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContext;
