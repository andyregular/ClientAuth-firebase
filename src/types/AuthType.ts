import { User } from 'firebase/auth';

export type AuthType = {
    user: User | null;
    signIn: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
    logOut: () => void;
    updateUser: (profile: string) => void;
    loading: boolean;
};