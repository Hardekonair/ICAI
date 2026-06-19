import { createContext,use,useContext, useEffect,useState } from "react";
import API from "../api.js";

// 1. Create Context
const AuthContext=createContext();

// 2. Create Provider
export const AuthProvider=({children})=>{   // {Childern} is a special prop that contains whatever you wrap inside this provider in App.jsx
    const [user,setuser]=useState(null);
    const [loading,setloading]=useState(true);

    const refreshUser=async()=>{
        const res=await API.get("/auth/me");
        setuser(res.data.user);
        return res.data.user;
    };

    // Check if user is logged in when app loads
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                await refreshUser();
            }catch(err){
                setuser(null);
            }finally{
                setloading(false);
            }
        };
        fetchUser();
    },[]);

    // This will render the components wrapped inside AuthProvider in App.jsx and provide them access to user and setUser through context
    // This makes user, setUser and loading available to any component that consumes this context
    const userId=user?.id ?? user?._id ?? null;

    return(
        <AuthContext.Provider value={{user,setuser,loading,refreshUser,userId}}>   
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth=()=>{      // 3. Create custom hook for easy access
    return useContext(AuthContext);     // This will allow any component to access user and setUser by calling useAuth()
}
