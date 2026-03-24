import type { PasswordData } from "./App";

interface CharacterSequenceValidatorProps {
    passwordData: PasswordData;
}

type SequenceResult = {
    isValid: boolean;
    validSequencesCount: number;
};

const isLower = (char: string) => /[a-z]/.test(char);
const isUpper = (char: string) => /[A-Z]/.test(char);
const isDigit = (char: string) => /[0-9]/.test(char);
const isSpecial = (char: string) => /[!@#$%^&*]/.test(char);

const getSequenceResult = (password: string): SequenceResult => {
    let count = 0;

    for (let i = 0; i <= password.length - 4; i++) {
        const a = password[i];
        const b = password[i + 1];
        const c = password[i + 2];
        const d = password[i + 3];

        if (isLower(a) && isUpper(b) && isDigit(c) && isSpecial(d)) {
            count++;
        }
    }

    return {
        isValid: count > 0,
        validSequencesCount: count,
    };
};

export const CharacterSequenceValidator = ({
                                               passwordData,
                                           }: CharacterSequenceValidatorProps) => {
    const result = getSequenceResult(passwordData.password);

    return (
        <div className="card">
            <h3>Sekvence znaků</h3>
            <p>
                Požadovaná sekvence: malé písmeno → velké písmeno → číslo → speciální
                znak
            </p>
            <p>
                Stav:{" "}
                <strong>{result.isValid ? "Splněno" : "Nesplněno"}</strong>
            </p>
            <p>Nalezené validní sekvence: {result.validSequencesCount}</p>
        </div>
    );
};