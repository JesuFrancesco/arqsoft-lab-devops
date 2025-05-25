import { Config } from "../config";

export const getCounter = async () => {
  try {
    const response = await fetch(`${Config.apiUrl}/counter`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching counter:", error);
    throw error;
  }
};

export const incrementCounter = async () => {
  try {
    const response = await fetch(`${Config.apiUrl}/counter-up`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error incrementing counter:", error);
    throw error;
  }
};
