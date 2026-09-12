import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../useGoogleAuth";
import Header from "../DashComponents/1Header";
import Contact from "../DashComponents/9Contact";
import { Sparkles, CheckCircle2 } from "lucide-react";
import SignupInfo from "./SignupInfo";

import {
  getPasswordChecks,
    isValidPassword
} from "../../utils/passwordValidation.js";

import {
    signup,
    sendSignupOTP,
    verifySignupOTP
} from "../../api/userApi.js";
import ShowLoading from "../ShowLoading.jsx";


export default function Signup() {

    const navigate = useNavigate();

    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");

    const [error, seterror] = useState("");

    const [loading, setloading] = useState(false);

    // OTP states
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const [verificationToken, setVerificationToken] =
        useState("");

    const [sendingOtp, setSendingOtp] =
        useState(false);

    const [verifyingOtp, setVerifyingOtp] =
        useState(false);

    const [otpError, setOtpError] =
        useState("");

    const [otpMessage, setOtpMessage] =
        useState("");

    const [touched, settouched] = useState({
        name: false,
        email: false,
        password: false,
        confirmpassword: false,
    });


    /* ----------------------------- */
    /* VALIDATION */
    /* ----------------------------- */

    const isValidName = () =>
        /^[a-zA-Z\s'-]{1,50}$/.test(name.trim());

    const isValidEmail = () =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const passwordChecks =
        getPasswordChecks(password);

    const isValidConfirmpassword =
        password === confirmpassword;

    const isFormValid =
        emailVerified &&
        isValidName() &&
        isValidEmail() &&
        isValidPassword(password) &&
        isValidConfirmpassword;


    /* ----------------------------- */
    /* SEND OTP */
    /* ----------------------------- */

    const handleSendOTP = async () => {

        if (!isValidEmail()) {
            seterror("Enter a valid email first.");
            return;
        }

        try {

            setSendingOtp(true);

            seterror("");
            setOtpError("");
            setOtpMessage("");

            const response =
                await sendSignupOTP(email);

            if (!response.success) {
                setOtpError(
                    response.message ||
                    "Failed to send verification code."
                );
                return;
            }

            setOtpSent(true);

            setOtpMessage(
                "Verification code sent to your email."
            );

        } catch (err) {

            console.error(
                "Send signup OTP error:",
                err
            );

            setOtpError(
                err.response?.data?.message ||
                "Failed to send verification code."
            );

        } finally {

            setSendingOtp(false);

        }
    };


    /* ----------------------------- */
    /* VERIFY OTP */
    /* ----------------------------- */

    const handleVerifyOTP = async () => {

        if (otp.length !== 6) {
            setOtpError(
                "Enter the 6-digit verification code."
            );
            return;
        }

        try {

            setVerifyingOtp(true);

            setOtpError("");
            setOtpMessage("");

            const response =
                await verifySignupOTP(
                    email,
                    otp
                );

            if (!response.success) {

                setOtpError(
                    response.message ||
                    "Invalid verification code."
                );

                return;
            }

            setEmailVerified(true);

            setVerificationToken(
                response.verificationToken
            );

            setOtpMessage(
                "Email verified successfully."
            );

        } catch (err) {

            console.error(
                "Verify signup OTP error:",
                err
            );

            setOtpError(
                err.response?.data?.message ||
                "Failed to verify verification code."
            );

        } finally {

            setVerifyingOtp(false);

        }
    };


    /* ----------------------------- */
    /* SIGNUP */
    /* ----------------------------- */

    const handleSubmit = async (e) => {

        e.preventDefault();

        seterror("");

        if (!emailVerified) {
            seterror(
                "Please verify your email first."
            );
            return;
        }

        if (!isValidName()) {
            seterror("Please enter a valid name.");
            return;
        }

        if (!isValidEmail()) {
            seterror("Please enter a valid email.");
            return;
        }

        if (!isValidPassword(password)) {
            seterror("Please enter a valid password.");
            return;
        }

        if (!isValidConfirmpassword) {
            seterror("Passwords do not match.");
            return;
        }

        try {

            setloading(true);

            const res = await signup({
                name,
                email,
                password,
                verificationToken
            });

            if (!res.success) {

                seterror(
                    res.message ||
                    "Signup failed."
                );

                return;
            }

            seterror("");

            setTimeout(() => {

                navigate(
                    "/dashboard",
                    { replace: true }
                );

            }, 1000);

        } catch (err) {

            console.error(
                "Signup error:",
                err
            );

            seterror(
                err.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setloading(false);

        }
    };


    return (
        <>
            {loading && (
                <ShowLoading
                    message="Creating your account..."
                />
            )}

            <div>

                <Header />

                <div className="flex min-h-screen flex-col px-4 sm:px-0 lg:flex-row">

                    {/* FORM */}

                    <div className="flex flex-1 items-center justify-center bg-gray-50 py-8 sm:py-12">

                        <div className="w-full max-w-[420px] px-2 sm:px-4">

                            <h2 className="text-2xl font-bold sm:text-3xl">
                                Start your journey
                            </h2>

                            <p className="mb-5 text-gray-500">
                                Start practicing with AI-powered interview feedback.
                            </p>


                            <form
                                className="flex flex-col"
                                onSubmit={handleSubmit}
                            >

                                {/* NAME */}

                                <label className="mt-3 text-sm">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    disabled={!emailVerified}
                                    className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:bg-gray-100 sm:p-4"
                                    placeholder="Aadi Vaish"
                                    value={name}
                                    onBlur={() =>
                                        settouched({
                                            ...touched,
                                            name: true
                                        })
                                    }
                                    onChange={(e) => {

                                        setname(
                                            e.target.value
                                        );

                                        seterror("");

                                        settouched({
                                            ...touched,
                                            name: true
                                        });

                                    }}
                                />

                                {touched.name &&
                                    !isValidName() && (
                                        <p className="mt-1 text-sm text-red-500">
                                            Only Alphabets allowed min=2 max=50
                                        </p>
                                    )}


                                {/* EMAIL */}

                                <label className="mt-3 text-sm">
                                    Email address
                                </label>

                                <div className="mt-1 flex gap-2">

                                    <input
                                        type="email"
                                        disabled={emailVerified}
                                        className="min-w-0 flex-1 rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:bg-gray-100 sm:p-4"
                                        placeholder="you@gmail.com"
                                        value={email}
                                        onBlur={() =>
                                            settouched({
                                                ...touched,
                                                email: true
                                            })
                                        }
                                        onChange={(e) => {

                                            setEmail(
                                                e.target.value
                                            );

                                            setEmailVerified(
                                                false
                                            );

                                            setVerificationToken(
                                                ""
                                            );

                                            setOtpSent(
                                                false
                                            );

                                            setOtp("");

                                            seterror("");

                                        }}
                                    />

                                    {!emailVerified && (
                                        <button
                                            type="button"
                                            onClick={
                                                handleSendOTP
                                            }
                                            disabled={
                                                sendingOtp ||
                                                !isValidEmail()
                                            }
                                            className="shrink-0 rounded-xl bg-yellow-400 px-3 text-xs font-semibold text-gray-900 hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {sendingOtp
                                                ? "Sending..."
                                                : "Verify Email"}
                                        </button>
                                    )}

                                </div>


                                {touched.email &&
                                    !isValidEmail() && (
                                        <p className="mt-1 text-sm text-red-500">
                                            Enter a Valid Email
                                        </p>
                                    )}


                                {/* OTP */}

                                {otpSent &&
                                    !emailVerified && (

                                        <div className="mt-3">

                                            <label className="text-sm">
                                                Verification Code
                                            </label>

                                            <div className="mt-1 flex gap-2">

                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={6}
                                                    value={otp}
                                                    onChange={(e) => {

                                                        const value =
                                                            e.target.value
                                                                .replace(
                                                                    /\D/g,
                                                                    ""
                                                                )
                                                                .slice(
                                                                    0,
                                                                    6
                                                                );

                                                        setOtp(
                                                            value
                                                        );

                                                    }}
                                                    placeholder="Enter 6-digit code"
                                                    className="min-w-0 flex-1 rounded-xl border border-gray-200 p-3 tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:p-4"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={
                                                        handleVerifyOTP
                                                    }
                                                    disabled={
                                                        verifyingOtp ||
                                                        otp.length !== 6
                                                    }
                                                    className="shrink-0 rounded-xl bg-yellow-400 px-4 text-xs font-semibold text-gray-900 hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {verifyingOtp
                                                        ? "Verifying..."
                                                        : "Verify"}
                                                </button>

                                            </div>

                                        </div>
                                    )}


                                {/* VERIFIED */}

                                {emailVerified && (

                                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">

                                        <CheckCircle2
                                            size={16}
                                        />

                                        Email verified

                                    </div>

                                )}


                                {otpMessage &&
                                    !emailVerified && (
                                        <p className="mt-2 text-xs text-green-600">
                                            {otpMessage}
                                        </p>
                                    )}

                                {otpError && (
                                    <p className="mt-2 text-xs text-red-500">
                                        {otpError}
                                    </p>
                                )}


                                {/* PASSWORD */}

                                <label className="mt-3 text-sm">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    disabled={!emailVerified}
                                    className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:bg-gray-100 sm:p-4"
                                    placeholder="Enter your password"
                                    value={password}
                                    onBlur={() =>
                                        settouched({
                                            ...touched,
                                            password: true
                                        })
                                    }
                                    onChange={(e) => {

                                        setpassword(
                                            e.target.value
                                        );

                                        seterror("");

                                        settouched({
                                            ...touched,
                                            password: true
                                        });

                                    }}
                                />

                                {emailVerified &&
                                    touched.password && (

                                        <div className="mt-2 text-sm">

                                            {!passwordChecks.length && (
                                                <p className="text-red-500">
                                                    • Must be 6-15 characters
                                                </p>
                                            )}

                                            {!passwordChecks.digit && (
                                                <p className="text-red-500">
                                                    • Must contain a number
                                                </p>
                                            )}

                                            {!passwordChecks.special && (
                                                <p className="text-red-500">
                                                    • Must contain a special character
                                                </p>
                                            )}

                                            {!passwordChecks.lowercase && (
                                                <p className="text-red-500">
                                                    • Only lowercase allowed
                                                </p>
                                            )}

                                        </div>
                                    )}


                                {/* CONFIRM PASSWORD */}

                                <label className="mt-3 text-sm">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    disabled={!emailVerified}
                                    className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:bg-gray-100 sm:p-4"
                                    placeholder="Re-Enter your password"
                                    value={confirmpassword}
                                    onBlur={() =>
                                        settouched({
                                            ...touched,
                                            confirmpassword: true
                                        })
                                    }
                                    onChange={(e) => {

                                        setconfirmpassword(
                                            e.target.value
                                        );

                                        seterror("");

                                        settouched({
                                            ...touched,
                                            confirmpassword: true
                                        });

                                    }}
                                />

                                {emailVerified &&
                                    touched.confirmpassword &&
                                    !isValidConfirmpassword && (
                                        <p className="mt-1 text-sm text-red-500">
                                            Password didn't match
                                        </p>
                                    )}


                                {/* ERROR */}

                                {error && (
                                    <p className="mt-3 text-sm text-red-600">
                                        {error}
                                    </p>
                                )}


                                {/* CREATE ACCOUNT */}

                                <button
                                    type="submit"
                                    disabled={
                                        !isFormValid ||
                                        loading
                                    }
                                    className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 p-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                >

                                    <Sparkles size={15} />

                                    {loading
                                        ? "Creating..."
                                        : "Create Account"}

                                </button>

                            </form>


                            {/* DIVIDER */}

                            <div className="relative my-6 text-center text-sm text-gray-400">

                                <span className="relative z-10 bg-gray-50 px-2">
                                    OR
                                </span>

                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>

                            </div>


                            <GoogleLoginButton />


                            <p className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-indigo-600"
                                >
                                    Login
                                </Link>
                            </p>

                            <p className="mt-5 text-center text-xs text-gray-400">
                                By continuing, you agree to our Terms and Privacy Policy.
                            </p>

                        </div>

                    </div>


                    {/* LEFT PANEL */}

                    <div className="hidden flex-1 lg:flex">
                        <SignupInfo />
                    </div>

                </div>

                <Contact />

            </div>
        </>
    );
}
