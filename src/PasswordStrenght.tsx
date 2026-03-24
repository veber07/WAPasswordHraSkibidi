import { useEffect, useState } from "react";
import type { PasswordData } from "./App";
import { CharacterSequenceValidator } from "./CharacterSequenceValidator";
import { PasswordTimeValidator } from "./PasswordTimeValidator";

interface PasswordStrengthProps {
    passwordData: PasswordData;
    setPassword: (
        newPassword: string | ((prev: string) => string)
    ) => void;
}

export const PasswordStrength = ({
                                     passwordData,
                                     setPassword,
                                 }: PasswordStrengthProps) => {
    const password = passwordData.password;

    const [passwordStrength, setPasswordStrength] = useState("Slabé");

    const checks = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
    };

    const evaluatePassword = (password: string) => {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[!@#$%^&*]/.test(password)) score++;

        if (score <= 1) return "Slabé";
        if (score <= 3) return "Střední";
        return "Silné";
    };

    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const strength = evaluatePassword(password);
            setPasswordStrength(strength);
        }, 0);

        return () => clearTimeout(timeout);
    }, [password]);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword((prevPassword) => {
                const action = Math.random() < 0.5 ? "add" : "remove";

                if (action === "add") {
                    return prevPassword + "💩";
                } else {
                    if (prevPassword.length === 0) return prevPassword;

                    const index = Math.floor(Math.random() * prevPassword.length);
                    return (
                        prevPassword.slice(0, index) +
                        prevPassword.slice(index + 1)
                    );
                }
            });
        }, 10000);

        return () => clearInterval(sabotageInterval);
    }, [setPassword]);

    let strengthClass = "weak";
    let width = "25%";

    if (passwordStrength === "Střední") {
        strengthClass = "medium";
        width = "65%";
    }

    if (passwordStrength === "Silné") {
        strengthClass = "strong";
        width = "100%";
    }

    return (
        <div className="card">
            <h2 className="mb-2 text-xl font-bold">Vyhodnocení hesla</h2>

            <p className="mb-2">
                Síla hesla: <strong>{passwordStrength}</strong>
            </p>

            <div className="strength-bar">
                <div
                    className={`strength-fill ${strengthClass}`}
                    style={{ width }}
                />
            </div>

            <ul className="mb-4 space-y-2">
                <li className="flex items-center gap-2">
                    <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${
                            checks.minLength ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        ✓
                    </span>
                    <span className={checks.minLength ? "ok" : "bad"}>
                        Alespoň 8 znaků
                    </span>
                </li>

                <li className="flex items-center gap-2">
                    <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${
                            checks.hasUppercase ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        ✓
                    </span>
                    <span className={checks.hasUppercase ? "ok" : "bad"}>
                        Obsahuje velké písmeno
                    </span>
                </li>

                <li className="flex items-center gap-2">
                    <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${
                            checks.hasNumber ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        ✓
                    </span>
                    <span className={checks.hasNumber ? "ok" : "bad"}>
                        Obsahuje číslo
                    </span>
                </li>

                <li className="flex items-center gap-2">
                    <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${
                            checks.hasSpecial ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        ✓
                    </span>
                    <span className={checks.hasSpecial ? "ok" : "bad"}>
                        Obsahuje speciální znak (!@#$%^&*)
                    </span>
                </li>
            </ul>

            {password.length > 0 && passwordStrength !== "Silné" && (
                <p className="warning">
                    Heslo zatím nesplňuje všechna bezpečnostní kritéria.
                </p>
            )}

            {password.length > 0 && passwordStrength === "Silné" && (
                <p className="success">
                    Heslo splňuje všechna hlavní kritéria.
                </p>
            )}

            <CharacterSequenceValidator passwordData={passwordData} />
            <PasswordTimeValidator passwordData={passwordData} />
        </div>
    );
};