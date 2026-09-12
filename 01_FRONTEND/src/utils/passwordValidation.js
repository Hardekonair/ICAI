export const getPasswordChecks = (password) => {
    return {
        length: password.length >= 6 && password.length <= 15,
        digit: /[0-9]/.test(password),
        special: /[!@#$%&*]/.test(password),
        lowercase: /^[a-z0-9!@#$%^&*]*$/.test(password),
    };
};

export const isValidPassword = (password) => {
    const checks = getPasswordChecks(password);

    return (
        checks.length &&
        checks.digit &&
        checks.special &&
        checks.lowercase
    );
};