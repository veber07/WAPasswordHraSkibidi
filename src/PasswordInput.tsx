import { useState } from "react";

interface PasswordInputProps {
    password: string;
    setPassword: (newPassword: string) => void;
}

export const PasswordInput = ({
                                  password,
                                  setPassword,
                              }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="card">
            <label htmlFor="password" className="label">
                Zadej heslo
            </label>

            <div className="input-row">
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Napiš heslo"
                    className="password-input"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="rounded-lg px-4 py-3 text-white font-semibold hover:opacity-90"
                    style={{ backgroundColor: "var(--primary-color)" }}
                >
                    {showPassword ? "Skrýt" : "Zobrazit"}
                </button>
            </div>
        </div>
    );
};