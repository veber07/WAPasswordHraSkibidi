import { useState } from "react";
import "./App.css";
import { PasswordInput } from "./PasswordInput";
import {PasswordStrength} from "./PasswordStrenght";
import {CountryFlagValidator} from "./ CountryFlagValidator.tsx";

export interface PasswordData {
    password: string;
    createdAt: number | null;
}

function App() {
    const [passwordData, setPasswordData] = useState<PasswordData>({
        password: "",
        createdAt: null,
    });

    const setPassword = (
        newPassword: string | ((prev: string) => string)
    ) => {
        setPasswordData((prev) => ({
            password:
                typeof newPassword === "function"
                    ? newPassword(prev.password)
                    : newPassword,
            createdAt: prev.createdAt ?? Date.now(),
        }));
    };

    return (
        <div className="app">
            <h1 className="text-3xl font-bold mb-6">Password Checker</h1>

            <PasswordInput
                password={passwordData.password}
                setPassword={setPassword}
            />

            <PasswordStrength
                passwordData={passwordData}
                setPassword={setPassword}
            />
            <CountryFlagValidator
                password={passwordData.password}
                />

        </div>
    );
}

export default App;