import API from "../api";

export const getQuestions = async () => {
    const response = await API.get("/questions");

    console.log("Response from backend:", response);

    return response.data.questions;
};