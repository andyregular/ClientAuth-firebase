import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { AuthType } from "../../types/AuthType";
import { User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendSignInLinkToEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from "../../../Firebase/firebase.config";

export const AuthContext = createContext<AuthType | undefined>(undefined);

const auth = getAuth(app);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
            setUser(currentUser);
            setLoading(false); 
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (profile: string): Promise<void> => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, { displayName: profile });
        } else {
            return Promise.reject(new Error('No user is currently signed in'));
        }
    };

    const sendMagicLink = (email: string) => {
        const actionCodeSettings = {
            url: 'https://client-auth-sand.vercel.app',
            handleCodeInApp: true,
        };
    
        return sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {

        })
        .catch((error) => {
            console.error('Error sending magic link:', error);
        });
    };

    const logOut = () => {
        return signOut(auth);
    };

    const value: AuthType = {
        user,
        signIn,
        signUp,
        updateUser,
        sendMagicLink,
        logOut, 
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
