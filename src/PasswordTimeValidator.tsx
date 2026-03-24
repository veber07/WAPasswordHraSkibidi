import type { PasswordData } from "./App";

interface PasswordTimeValidatorProps {
    passwordData: PasswordData;
}

type TimeValidationResult = {
    isValid: boolean;
    elapsedMs: number;
    elapsedSeconds: number;
    message: string;
};

const getTimeValidationResult = (
    passwordData: PasswordData,
    minSeconds = 5
): TimeValidationResult => {
    if (!passwordData.createdAt || passwordData.password.length === 0) {
        return {
            isValid: false,
            elapsedMs: 0,
            elapsedSeconds: 0,
            message: "Heslo zatím nebylo zadáno.",
        };
    }

    const elapsedMs = Date.now() - passwordData.createdAt;
    const elapsedSeconds = elapsedMs / 1000;
    const isValid = elapsedSeconds >= minSeconds;

    return {
        isValid,
        elapsedMs,
        elapsedSeconds,
        message: isValid
            ? "Heslo nebylo zadáno podezřele rychle."
            : "Heslo bylo zadáno příliš rychle, může jít o automatické generování.",
    };
};

export const PasswordTimeValidator = ({
                                          passwordData,
                                      }: PasswordTimeValidatorProps) => {
    const result = getTimeValidationResult(passwordData);

    return (
        <div className="card">
            <h3>Časová validace</h3>
            <p>
                Čas od začátku zadávání:{" "}
                <strong>{result.elapsedSeconds.toFixed(2)} s</strong>
            </p>
            <p>
                Stav:{" "}
                <strong>{result.isValid ? "OK" : "neni to skibidi"}</strong>
            </p>
            <p>{result.message}</p>
        </div>
    );
};