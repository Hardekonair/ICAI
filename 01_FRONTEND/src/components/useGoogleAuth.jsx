import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import API from '../api';

function GoogleLoginButton() {
    const [error, setError] = useState("");

    const responseGoogle = async (credentialResponse) => {
        try {
            setError("");
            console.log(credentialResponse);

            if (!credentialResponse?.credential) {
                setError("Google did not return a valid credential.");
                return;
            }

            const res = await API.post("/auth/google", {
                token: credentialResponse.credential,
            });

            console.log("Backend Response: ", res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.location.href = "/dashboard";
        } catch (err) {
            console.log("Google login error:", err);
            console.log("Google login response:", err.response?.data);
            console.log("Google login message:", err.message);
            setError(err.response?.data?.message || "Google login failed. Please try again.");
        }
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => setError("Google login popup failed or was cancelled.")}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default GoogleLoginButton;
