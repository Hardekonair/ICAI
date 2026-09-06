import API from "../api";

export const analyzeInterview = async (data) => {
  const response = await API.post(
    "/interview/analyze",
    data
  );
  return response.data;
};

export const saveInterview = async (formData) => {
    const response = await API.post("/interview/save",formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        }
    );
    return response.data;

};

export const getInterviewSession = async (sessionId) => {

    const response = await API.get(
        `/interview/${sessionId}`,
        {
            withCredentials: true
        }
    );

    return response.data;
};