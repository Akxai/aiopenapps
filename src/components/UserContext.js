import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// import { createContext, useContext, useEffect, useState } from "react";

// const UserContext = createContext();

// export function useUserContext() {
//   return useContext(UserContext);
// }

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Function to handle login and set the user data in local storage
//   const handleLogin = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   // Function to handle logout and remove user data from local storage
//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   // Check local storage on initial load to get the user data if it exists
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
