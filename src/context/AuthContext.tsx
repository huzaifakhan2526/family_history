import React, { createContext, ReactNode, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContext {
    userToken: any;
    userId: any;
}

const defaultAuthContext: IAuthContext = {
    userToken: null,
    userId: null,
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }): any => {
    const [userToken, setToken] = useState<any | null>(null);
    const [userId, setUserId] = useState<any | null>(null);


    return (
        <AuthContext.Provider value={{ userToken, userId }}>
            {children}
        </AuthContext.Provider>
    );
};
