import API from "../api";

export const getCurrentUser = async () => {
    const response = await API.get("/user/me");

    return response.data;
};

export const updateCurrentUser = async (userData) => {
    const response = await API.patch(
        "/user/me",
        userData
    );

    return response.data;
};

export const changePassword = async (passwordData) => {
    const response = await API.post(
        "/user/change-password",
        passwordData
    );

    return response.data;
};
export const signup = async (userData) => {
    const response = await API.post(
        "/auth/signup",
        userData
    );

    return response.data;
};

export const sendSignupOTP = async (email) => {
    const response = await API.post(
        "/email-verification/signup/send-otp",
        { email }
    );

    return response.data;
};

export const verifySignupOTP = async (email, otp) => {
    const response = await API.post(
        "/email-verification/signup/verify-otp",
        {
            email,
            otp,
        }
    );

    return response.data;
};