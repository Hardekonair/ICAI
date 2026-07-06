import axios from "axios";

export const getQuestions = async () => {
    const response = await axios.get("/api/questions");

    console.log("Response from backend:", response);

    return response.data.questions;
};