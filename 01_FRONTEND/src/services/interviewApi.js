import axios from "axios";
import API from "../api";

export const analyzeInterview = async (data) => {
  const response = await API.post(
    "/interview/analyze",
    data
  );

  return response.data;
};