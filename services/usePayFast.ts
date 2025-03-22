import axios from "axios";
import jsonFomrData from "~/utils/jsonFomrData";

const payFast = async (
  url: string,
  method: "GET" | "POST" = "GET",
  jsonData?: any
) => {
  const formData = jsonFomrData.jsonToFormData(jsonData);
  try {
    const response = await fetch(url, {
      method: method,
      body: formData, // No need to set Content-Type manually
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default payFast;
