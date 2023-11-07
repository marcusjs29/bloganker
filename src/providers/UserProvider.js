import { createContext, useEffect, useState, useContext } from "react";
import { baseApiUrl } from "../APIConfig";

const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
}

const userLogin = async (loginInfo) => {
    const result = await fetch(`${baseApiUrl}/user`, {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(loginInfo)
    })
    return await result.json();
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : undefined;
    });

    const handleLogin = async (loginInfo) => {
        const result = await userLogin(loginInfo);
        setUser(result)
        localStorage.setIrem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result));
        return true;
    }

    return (
        <UserContext.Provider value={{user, handleLogin}}>
            {children}
        </UserContext.Provider>
    )
}