import { useEffect, useState } from "react";
import {
    KeyRound,
    Trash2,
    ChevronRight,
    X,
    Lock,
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";

// import VerifyEmail from "../components/VerifyEmail";
import {
    getCurrentUser,
    changePassword,
} from "../api/userApi";
import VerifyEmail from "../services/VerifyEmail";
import { getPasswordChecks, isValidPassword } from "../utils/passwordValidation";

const PrivacySecurityPage = () => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [userError, setUserError] = useState("");

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoadingUser(true);
                setUserError("");

                const response = await getCurrentUser();

                if (response.success) {
                    setUser(response.user);
                } else {
                    setUserError(
                        response.message || "Failed to load user."
                    );
                }
            } catch (error) {
                console.error("Fetch user error:", error);

                setUserError(
                    error.response?.data?.message ||
                    "Failed to load user information."
                );
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, []);

    if (loadingUser) {
        return (
            <div className="flex min-h-[350px] items-center justify-center">
                <Loader2
                    size={22}
                    className="animate-spin text-gray-400"
                />
            </div>
        );
    }

    if (userError) {
        return (
            <div className="flex min-h-[350px] items-center justify-center px-6">
                <p className="text-sm text-red-500">
                    {userError}
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-5">
                <h2 className="text-xl font-bold text-gray-800">
                    Privacy & Security
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Manage your account security and personal data.
                </p>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Security */}
                <div className="space-y-3">
                    <SecurityItem
                        icon={KeyRound}
                        title="Change Password"
                        description="Update your account password"
                        onClick={() =>
                            setShowPasswordModal(true)
                        }
                    />
                </div>

                {/* Danger Zone */}
                <div className="mt-10">
                    <h3 className="mb-3 text-sm font-semibold text-red-600">
                        Danger Zone
                    </h3>

                    <div className="rounded-xl border border-red-100 p-5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                                <Trash2 size={20} />
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-800">
                                    Delete Account
                                </h4>

                                <p className="mt-1 text-xs text-gray-400">
                                    Permanently delete your account and associated data.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <ChangePasswordModal
                    email={user.email}
                    onClose={() =>
                        setShowPasswordModal(false)
                    }
                />
            )}
        </>
    );
};


/* ------------------------------------------------ */
/* Security Item */
/* ------------------------------------------------ */

const SecurityItem = ({
    icon: Icon,
    title,
    description,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-300 hover:bg-gray-50"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <Icon size={19} />
            </div>

            <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800">
                    {title}
                </h4>

                <p className="mt-1 text-xs text-gray-400">
                    {description}
                </p>
            </div>

            <ChevronRight
                size={18}
                className="text-gray-400"
            />
        </button>
    );
};


/* ------------------------------------------------ */
/* Change Password Modal */
/* ------------------------------------------------ */

const ChangePasswordModal = ({
    email,
    onClose,
}) => {
    const [verificationToken, setVerificationToken] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const passwordChecks = getPasswordChecks(newPassword);

    const validNewPassword = isValidPassword(newPassword);

    const passwordsMatch =
        newPassword === confirmPassword;

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const emailVerified = Boolean(verificationToken);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!emailVerified) {
            setError("Please verify your email first.");
            return;
        }

        if (!newPassword || !confirmPassword) {
            setError("Please fill in all password fields.");
            return;
        }

        if (newPassword.length < 8) {
            setError(
                "Password must be at least 8 characters."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await changePassword({
                verificationToken,
                newPassword,
                confirmPassword,
            });

            if (!response.success) {
                setError(
                    response.message ||
                    "Failed to change password."
                );
                return;
            }

            setSuccess(
                "Password changed successfully."
            );

            setTimeout(() => {
                onClose();
            }, 1200);
        } catch (error) {
            console.error(
                "Change password error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to change password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">

                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">
                            Change Password
                        </h3>

                        <p className="mt-0.5 text-xs text-gray-400">
                            Verify your email before setting a new password.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-5 p-5">

                    {/* Email Verification */}
                    <VerifyEmail
                        email={email}
                        onVerified={(token) =>
                            setVerificationToken(token)
                        }
                    />

                    {/* Password Form */}
                    <form
                        onSubmit={handlePasswordChange}
                        className="space-y-4"
                    >
                        {/* New Password */}
                        <PasswordInput
                            label="New Password"
                            value={newPassword}
                            onChange={setNewPassword}
                            disabled={!emailVerified}
                            showPassword={showNewPassword}
                            setShowPassword={
                                setShowNewPassword
                            }
                        />

                        {emailVerified && newPassword && (
                            <div className="text-xs space-y-1">

                                <p className={passwordChecks.length
                                    ? "text-green-600"
                                    : "text-red-500"
                                }>
                                    • 6-15 characters
                                </p>

                                <p className={passwordChecks.digit
                                    ? "text-green-600"
                                    : "text-red-500"
                                }>
                                    • Contains a number
                                </p>

                                <p className={passwordChecks.special
                                    ? "text-green-600"
                                    : "text-red-500"
                                }>
                                    • Contains a special character
                                </p>

                                <p className={passwordChecks.lowercase
                                    ? "text-green-600"
                                    : "text-red-500"
                                }>
                                    • Only lowercase letters allowed
                                </p>

                            </div>
                        )}

                        {/* Confirm Password */}
                        <PasswordInput
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            disabled={!emailVerified}
                            showPassword={
                                showConfirmPassword
                            }
                            setShowPassword={
                                setShowConfirmPassword
                            }
                        />

                        {/* Error */}
                        {error && (
                            <p className="text-xs text-red-500">
                                {error}
                            </p>
                        )}

                        {/* Success */}
                        {success && (
                            <p className="text-xs text-green-600">
                                {success}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={
                            !emailVerified ||
                            !validNewPassword ||
                            !passwordsMatch ||
                            loading
                        }
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading && (
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                            )}

                            {loading
                                ? "Changing Password..."
                                : "Change Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


/* ------------------------------------------------ */
/* Password Input */
/* ------------------------------------------------ */

const PasswordInput = ({
    label,
    value,
    onChange,
    disabled,
    showPassword,
    setShowPassword,
}) => {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                {label}
            </label>

            <div className="relative">
                <Lock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    disabled={disabled}
                    placeholder={
                        disabled
                            ? "Verify email first"
                            : "Enter password"
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-10 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                />

                <button
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                        setShowPassword(
                            !showPassword
                        )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                >
                    {showPassword ? (
                        <EyeOff size={16} />
                    ) : (
                        <Eye size={16} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default PrivacySecurityPage;