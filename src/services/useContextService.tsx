import React, {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from "react";
// import { UserDetailType } from "../types";

type AuthContextType = {
    user: { [key: string]: any } | null;
    setUser: Dispatch<SetStateAction< { [key: string]: any } | null>>;
    theme:string;
    setTheme: Dispatch<SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
    const [user, setUser] = useState<{ [key: string]: any }| null>(null);
    const[theme,setTheme] = useState('light');
    return <AuthContext.Provider {...props} value={{ user, setUser , theme , setTheme }} />;
};

export { AuthProvider, useAuth };