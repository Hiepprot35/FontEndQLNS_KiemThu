import { useState } from "react";


export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('Token');
        const userToken = JSON?.parse(tokenString);
        return userToken
    }
    const [token, setToken] = useState(getToken())
    const saveToken = (userToken) => {
        localStorage.setItem('Token', JSON.stringify(userToken));
        setToken(userToken)
    }
    return{
        getToken:getToken,
        Token: token,
        setAccessToken:saveToken,
  }
} 