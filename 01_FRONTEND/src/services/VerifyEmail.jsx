import { useState } from "react";
import {
    Mail,
    CheckCircle2,
    Loader2,
} from "lucide-react";

import API from "../api";

const VerifyEmail = ({
    email,
    onVerified,
}) => {
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const [verified, setVerified] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const sendOTP = async () => {
        try {
            setLoading(true);
            setError("");
            setMessage("");

            const response = await API.post(
                "/email-verification/password/send-otp"
            );

            if (!response.data.success) {
                setError(
                    response.data.message ||
                    "Failed to send verification code."
                );
                return;
            }

            setOtpSent(true);
            setMessage(
                "Verification code sent to your email."
            );
        } catch (error) {
            console.error(
                "Send OTP error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to send verification code."
            );
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async () => {
        if (!otp.trim()) {
            setError(
                "Please enter the verification code."
            );
            return;
        }

        try {
            setVerifying(true);
            setError("");
            setMessage("");

            const response = await API.post(
                "/email-verification/password/verify-otp",
                {
                    otp: otp.trim(),
                }
            );

            if (!response.data.success) {
                setError(
                    response.data.message ||
                    "Invalid verification code."
                );
                return;
            }

            setVerified(true);
            setMessage(
                "Email verified successfully."
            );

            onVerified(
                response.data.verificationToken
            );
        } catch (error) {
            console.error(
                "Verify OTP error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to verify code."
            );
        } finally {
            setVerifying(false);
        }
    };

    if (verified) {
        return (
            <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2.5">
                <div className="flex items-center gap-2">
                    <CheckCircle2
                        size={16}
                        className="shrink-0 text-green-600"
                    />

                    <div>
                        <p className="text-xs font-medium text-green-700">
                            Email verified
                        </p>

                        <p className="text-[11px] text-green-600">
                            {email}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">

            {/* Email */}
            <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                    Email Address
                </label>

                <div className="flex gap-2">

                    <div className="relative flex-1">
                        <Mail
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 py-2.5 pl-9 pr-3 text-sm text-gray-500"
                        />
                    </div>

                    {!otpSent && (
                        <button
                            type="button"
                            onClick={sendOTP}
                            disabled={loading}
                            className="shrink-0 rounded-lg bg-yellow-400 px-3.5 py-2 text-xs font-medium text-gray-900 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Sending..."
                                : "Verify Email"}
                        </button>
                    )}

                </div>
            </div>

            {/* OTP */}
            {otpSent && (
                <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                        Verification Code
                    </label>

                    <div className="flex gap-2">

                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => {
                                const value =
                                    e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6);

                                setOtp(value);
                            }}
                            placeholder="Enter 6-digit code"
                            disabled={verifying}
                            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm tracking-widest text-gray-800 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 disabled:bg-gray-100"
                        />

                        <button
                            type="button"
                            onClick={verifyOTP}
                            disabled={
                                verifying ||
                                otp.length !== 6
                            }
                            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-yellow-400 px-3.5 py-2 text-xs font-medium text-gray-900 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {verifying && (
                                <Loader2
                                    size={14}
                                    className="animate-spin"
                                />
                            )}

                            {verifying
                                ? "Verifying..."
                                : "Verify"}
                        </button>

                    </div>

                    <div className="mt-2 flex items-center justify-between">

                        <p className="text-[11px] text-gray-400">
                            Check your registered email.
                        </p>

                        <button
                            type="button"
                            onClick={sendOTP}
                            disabled={loading}
                            className="text-[11px] font-medium text-yellow-600 hover:text-yellow-700 disabled:opacity-50"
                        >
                            Resend code
                        </button>

                    </div>
                </div>
            )}

            {/* Message */}
            {message && (
                <p className="text-xs text-green-600">
                    {message}
                </p>
            )}

            {/* Error */}
            {error && (
                <p className="text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default VerifyEmail;